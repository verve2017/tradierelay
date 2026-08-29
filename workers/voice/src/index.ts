interface Env {
  OPENAI_API_KEY: string;
  OPENAI_MODEL?: string;
  TWILIO_AUTH_TOKEN: string;
  VOICE_WEBHOOK_SECRET: string;
  APP_ORIGIN: string;
}

type RelaySetup = { type: 'setup'; callSid?: string; from?: string; to?: string; customParameters?: Record<string, string> };
type RelayPrompt = { type: 'prompt'; voicePrompt?: string; lang?: string; last?: boolean };
type RelayMessage = RelaySetup | RelayPrompt | { type: 'interrupt' } | { type: 'error'; description?: string };
type ChatTurn = { role: 'user' | 'assistant'; content: string };

const SYSTEM_PROMPT = `You are TradieRelay, an AI phone receptionist for an Australian trade business.
Speak naturally in short Australian English sentences and ask one question at a time.
Capture: caller name, callback number, job type, plain-English description, suburb/address, urgency, access constraints and preferred time.
If there may be gas, fire, live electricity, flooding, injury or immediate danger, tell the caller to move to safety and call 000 or the relevant emergency service. Do not give technical safety instructions.
Never diagnose, promise attendance, confirm a booking or give a price. Say the tradie will review the details and contact them.
After two failed attempts to clarify something, mark it unknown and move on.
When the required details are captured, read back a short summary and ask the caller to confirm it.`;

export default {
  async fetch(request: Request, env: Env, context: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/health') return Response.json({ ok: true, service: 'tradierelay-voice' });
    if (url.pathname !== '/conversation') return new Response('Not found', { status: 404 });
    if (request.headers.get('upgrade')?.toLowerCase() !== 'websocket') return new Response('WebSocket upgrade required', { status: 426 });
    if (!env.TWILIO_AUTH_TOKEN || !env.OPENAI_API_KEY || !env.VOICE_WEBHOOK_SECRET || !env.APP_ORIGIN) return new Response('Voice service is not configured', { status: 503 });
    if (!(await validateTwilioWebSocketSignature(request.url, request.headers.get('x-twilio-signature'), env.TWILIO_AUTH_TOKEN))) return new Response('Invalid Twilio signature', { status: 401 });

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];
    server.accept();
    const startedAt = Date.now();
    const history: ChatTurn[] = [];
    const transcript: string[] = [];
    let setup: RelaySetup | null = null;
    let finalised = false;
    let processing = Promise.resolve();

    const finalise = async (outcome: string) => {
      if (finalised || !setup?.callSid) return;
      finalised = true;
      await postCallResult(env, {
        provider: 'twilio-conversation-relay', providerCallId: setup.callSid,
        providerEventId: `${setup.callSid}:voice-worker-final`, tenantId: setup.customParameters?.tenantId ?? null,
        toNumber: setup.to ?? null, fromNumber: setup.from ?? null, transcript: transcript.join('\n').slice(0, 120_000),
        durationSeconds: Math.max(0, Math.round((Date.now() - startedAt) / 1000)), outcome,
      });
    };

    server.addEventListener('message', (event) => {
      processing = processing.then(async () => {
        let message: RelayMessage;
        try { message = JSON.parse(String(event.data)) as RelayMessage; } catch { return; }
        if (message.type === 'setup') { setup = message; return; }
        if (message.type === 'interrupt') return;
        if (message.type === 'error') { transcript.push(`System: ${message.description ?? 'ConversationRelay error'}`); return; }
        const callerText = message.voicePrompt?.trim();
        if (!callerText) return;
        transcript.push(`Caller: ${callerText}`);
        history.push({ role: 'user', content: callerText });
        const reply = await createReply(env, history);
        history.push({ role: 'assistant', content: reply });
        transcript.push(`TradieRelay: ${reply}`);
        server.send(JSON.stringify({ type: 'text', token: reply, last: true, interruptible: true, preemptible: false }));
      }).catch((error: unknown) => {
        console.error('conversation_message_failed', error instanceof Error ? error.message : 'unknown');
        if (server.readyState === WebSocket.OPEN) server.send(JSON.stringify({ type: 'text', token: 'Sorry, I had trouble with that. Please say it once more.', last: true }));
      });
    });
    server.addEventListener('close', () => { context.waitUntil(processing.then(() => finalise('completed'))); });
    server.addEventListener('error', () => { context.waitUntil(processing.then(() => finalise('provider_error'))); });
    return new Response(null, { status: 101, webSocket: client });
  },
} satisfies ExportedHandler<Env>;

async function createReply(env: Env, history: ChatTurn[]) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST', headers: { authorization: `Bearer ${env.OPENAI_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ model: env.OPENAI_MODEL ?? 'gpt-4o-mini', instructions: SYSTEM_PROMPT, input: history.slice(-16), max_output_tokens: 140, temperature: 0.2 }), signal: controller.signal,
    });
    if (!response.ok) throw new Error(`OpenAI ${response.status}`);
    const body = await response.json() as { output_text?: string; output?: { content?: { type?: string; text?: string }[] }[] };
    const text = body.output_text ?? body.output?.flatMap((item) => item.content ?? []).find((item) => item.type === 'output_text')?.text;
    return text?.trim() || 'Thanks. What suburb is the job in?';
  } finally { clearTimeout(timeout); }
}

export async function validateTwilioWebSocketSignature(url: string, supplied: string | null, authToken: string) {
  if (!supplied || !authToken) return false;
  for (const candidate of [url, url.replace(/^https:/u, 'wss:')]) {
    const expected = await hmacBase64('SHA-1', authToken, candidate);
    if (constantTimeEqual(expected, supplied)) return true;
  }
  return false;
}

async function postCallResult(env: Env, payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);
  const signature = await hmacHex('SHA-256', env.VOICE_WEBHOOK_SECRET, body);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(`${env.APP_ORIGIN.replace(/\/$/u, '')}/api/webhooks/voice/call-ended`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-tradierelay-signature': signature }, body, signal: controller.signal });
    if (!response.ok) console.error('call_result_rejected', response.status);
  } catch (error) { console.error('call_result_failed', error instanceof Error ? error.message : 'unknown'); }
  finally { clearTimeout(timeout); }
}

async function hmacBase64(hash: 'SHA-1', secret: string, message: string) { const bytes = await hmac(hash, secret, message); let binary = ''; for (const byte of bytes) binary += String.fromCharCode(byte); return btoa(binary); }
async function hmacHex(hash: 'SHA-256', secret: string, message: string) { return [...await hmac(hash, secret, message)].map((byte) => byte.toString(16).padStart(2, '0')).join(''); }
async function hmac(hash: 'SHA-1' | 'SHA-256', secret: string, message: string) { const encoder = new TextEncoder(); const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash }, false, ['sign']); return new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(message))); }
function constantTimeEqual(left: string, right: string) { if (left.length !== right.length) return false; let result = 0; for (let index = 0; index < left.length; index += 1) result |= left.charCodeAt(index) ^ right.charCodeAt(index); return result === 0; }
