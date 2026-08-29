import { getRuntimeEnv } from '@/db';

export type JobExtraction = {
  caller_name: string | null;
  phone_e164: string | null;
  trade_category: string;
  title: string;
  description: string;
  summary: string;
  suburb: string | null;
  address: string | null;
  urgency: 'emergency' | 'urgent' | 'standard' | 'flexible';
  preferred_windows: string[];
  access_notes: string | null;
  safety_note: string | null;
  confidence: {
    caller_name: number;
    job: number;
    suburb: number;
    urgency: number;
  };
  needs_human_review: boolean;
};

const jobRecordSchema = {
  type: 'object',
  properties: {
    caller_name: { type: ['string', 'null'] },
    phone_e164: { type: ['string', 'null'] },
    trade_category: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    summary: { type: 'string' },
    suburb: { type: ['string', 'null'] },
    address: { type: ['string', 'null'] },
    urgency: { type: 'string', enum: ['emergency', 'urgent', 'standard', 'flexible'] },
    preferred_windows: { type: 'array', items: { type: 'string' } },
    access_notes: { type: ['string', 'null'] },
    safety_note: { type: ['string', 'null'] },
    confidence: {
      type: 'object',
      properties: {
        caller_name: { type: 'number', minimum: 0, maximum: 1 },
        job: { type: 'number', minimum: 0, maximum: 1 },
        suburb: { type: 'number', minimum: 0, maximum: 1 },
        urgency: { type: 'number', minimum: 0, maximum: 1 },
      },
      required: ['caller_name', 'job', 'suburb', 'urgency'],
      additionalProperties: false,
    },
    needs_human_review: { type: 'boolean' },
  },
  required: [
    'caller_name', 'phone_e164', 'trade_category', 'title', 'description', 'summary', 'suburb', 'address',
    'urgency', 'preferred_windows', 'access_notes', 'safety_note', 'confidence', 'needs_human_review',
  ],
  additionalProperties: false,
} as const;

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
  error?: { message?: string };
};

function extractOutputText(response: OpenAIResponse) {
  if (response.output_text) return response.output_text;
  for (const item of response.output ?? []) {
    for (const content of item.content ?? []) {
      if (content.type === 'output_text' && content.text) return content.text;
    }
  }
  return null;
}

export async function extractJobRecord(transcript: string, knownPhone?: string | null): Promise<JobExtraction> {
  const runtime = getRuntimeEnv();
  if (!runtime.OPENAI_API_KEY) return fallbackExtraction(transcript, knownPhone);

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${runtime.OPENAI_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: runtime.OPENAI_MODEL ?? 'gpt-4o-mini',
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text: 'Extract a cautious Australian tradie job record. Never invent missing details. Dangerous gas, live electrical or immediate life-safety situations are emergency. Mark uncertain or incomplete records for human review.',
            },
          ],
        },
        { role: 'user', content: [{ type: 'input_text', text: `Known caller phone: ${knownPhone ?? 'not supplied'}\n\nTranscript:\n${transcript}` }] },
      ],
      text: { format: { type: 'json_schema', name: 'job_record_v1', strict: true, schema: jobRecordSchema } },
    }),
    signal: AbortSignal.timeout(20_000),
  });

  const result = await response.json() as OpenAIResponse;
  if (!response.ok) throw new Error(`OpenAI extraction failed: ${result.error?.message ?? response.status}`);
  const outputText = extractOutputText(result);
  if (!outputText) throw new Error('OpenAI extraction returned no structured output.');
  return JSON.parse(outputText) as JobExtraction;
}

function fallbackExtraction(transcript: string, knownPhone?: string | null): JobExtraction {
  const lower = transcript.toLowerCase();
  const emergency = /gas leak|live wire|sparking|smoke|flooding|burst pipe/u.test(lower);
  const urgent = emergency || /urgent|today|water leak|no power|locked out/u.test(lower);
  const suburbMatch = transcript.match(/(?:in|at)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/u);
  const callerMatch = transcript.match(/(?:i(?:'m| am)|name is)\s+([A-Z][a-z]+)/u);
  const trimmed = transcript.trim().replace(/\s+/gu, ' ');

  return {
    caller_name: callerMatch?.[1] ?? null,
    phone_e164: knownPhone ?? null,
    trade_category: 'general',
    title: trimmed.slice(0, 54) || 'Caller left a message',
    description: trimmed || 'No clear job description was captured.',
    summary: trimmed.slice(0, 220) || 'The caller left an incomplete message. Call back to confirm the job.',
    suburb: suburbMatch?.[1] ?? null,
    address: null,
    urgency: emergency ? 'emergency' : urgent ? 'urgent' : 'standard',
    preferred_windows: [],
    access_notes: null,
    safety_note: emergency ? 'Potential safety issue detected. Human review required immediately.' : null,
    confidence: { caller_name: callerMatch ? 0.7 : 0, job: trimmed ? 0.55 : 0, suburb: suburbMatch ? 0.6 : 0, urgency: emergency ? 0.8 : 0.5 },
    needs_human_review: !trimmed || !suburbMatch || emergency,
  };
}
