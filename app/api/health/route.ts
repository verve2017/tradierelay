import { getRuntimeEnv } from '@/db';
import { json } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

export async function GET() {
  const runtime = getRuntimeEnv();
  return json({
    ok: true,
    service: 'TradieRelay',
    status: 'operational',
    providers: {
      database: Boolean(runtime.DB),
      files: Boolean(runtime.FILES),
      ai: Boolean(runtime.OPENAI_API_KEY),
      sms: Boolean(runtime.TWILIO_ACCOUNT_SID && runtime.TWILIO_AUTH_TOKEN && runtime.TWILIO_FROM_NUMBER),
      voice: Boolean(runtime.VOICE_WEBSOCKET_URL && runtime.VOICE_WEBHOOK_SECRET),
    },
    checkedAt: new Date().toISOString(),
  });
}
