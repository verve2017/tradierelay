declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    FILES: R2Bucket;
    APP_ORIGIN?: string;
    TOKEN_PEPPER?: string;
    OPERATOR_ACCESS_KEY?: string;
    OPENAI_API_KEY?: string;
    OPENAI_MODEL?: string;
    TWILIO_ACCOUNT_SID?: string;
    TWILIO_AUTH_TOKEN?: string;
    TWILIO_FROM_NUMBER?: string;
    RETELL_WEBHOOK_SECRET?: string;
    VOICE_WEBSOCKET_URL?: string;
    VOICE_WEBHOOK_SECRET?: string;
    CRON_SECRET?: string;
  }
}
