# Provider activation checklist

Use accounts owned by TradieRelay. Do not copy credentials from VERVE or another business.

## 1. Create the dedicated providers

1. Create a Twilio project or sub-account for TradieRelay with Australian voice and SMS capability.
2. Buy an Australian number and complete any current Australian identity/address requirements shown by Twilio.
3. Create a dedicated OpenAI API project with a strict monthly budget and usage alert.
4. Generate independent random values for `TOKEN_PEPPER`, `OPERATOR_ACCESS_KEY`, `CRON_SECRET` and `VOICE_WEBHOOK_SECRET`.

## 2. Deploy the voice Worker

From the repository root:

```bash
npx wrangler deploy --config workers/voice/wrangler.jsonc
npx wrangler secret put OPENAI_API_KEY --config workers/voice/wrangler.jsonc
npx wrangler secret put TWILIO_AUTH_TOKEN --config workers/voice/wrangler.jsonc
npx wrangler secret put VOICE_WEBHOOK_SECRET --config workers/voice/wrangler.jsonc
npx wrangler secret put APP_ORIGIN --config workers/voice/wrangler.jsonc
```

Set `OPENAI_MODEL` as a Worker variable if the default is not suitable. Record the deployed URL as `wss://…/conversation`.

## 3. Install Sites secrets

Install the values from `.env.example` in the TradieRelay Sites project. `VOICE_WEBHOOK_SECRET` must match the Worker. `VOICE_WEBSOCKET_URL` must be the deployed `wss://` URL. Never place secret values in Git, screenshots, support tickets or client-side environment variables.

## 4. Configure Twilio

- Incoming voice webhook: `POST https://tradie-relay.verve-9089.chatgpt.site/api/webhooks/twilio/voice`
- Incoming message webhook: `POST https://tradie-relay.verve-9089.chatgpt.site/api/webhooks/twilio/sms`
- Message status callback: `POST https://tradie-relay.verve-9089.chatgpt.site/api/webhooks/twilio/message-status`

Keep Twilio request validation enabled. Do not use a webhook test mode that bypasses signatures.

## 5. Onboard the first pilot tradie

Open `/operator` with the operator bearer key, then add the business, owner mobile, trade, service suburbs and verified call-out price. Add the assigned Twilio number to the tenant record before forwarding calls.

Run the first pilot with one named tradie, a narrow service area and message-taking fallback enabled. Forward only missed/after-hours calls at first.

## 6. Test before forwarding real customers

- Normal job: name, callback, description, suburb, urgency and timing are captured.
- Unclear caller: after two failed clarifications the field becomes unknown and the call continues.
- Emergency wording: no diagnosis; caller is directed to safety and 000/relevant emergency service.
- Price question: receptionist refuses to quote and says the tradie will review.
- Provider outage: Twilio takes a disclosed recorded message.
- SMS opt-out: `STOP` is honoured and future automated messages are suppressed.
- Quote: no customer message can be sent until a tradie checks the approval box.
- Customer link: expired and altered tokens are rejected.
- Tenant isolation: a link from one business cannot open another business’s job or quote.

## 7. Pilot telemetry and kill/keep review

Measure from day one: answered calls, completed briefs, urgent alerts, human corrections, quote drafts, quote sends, accepts, changes requested, SMS delivery failures, opt-outs, call cost and AI cost. Review on **12 September 2026**. Keep the pilot only if Bob uses the inbox weekly and it demonstrably removes missed-call callbacks, call notes or quote chasing without creating a larger exception queue.
