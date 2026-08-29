# TradieRelay

TradieRelay is a production-pilot platform for Australian trade businesses. It answers missed or after-hours calls, captures a useful job brief, alerts the tradie, creates a human-reviewed quote draft and follows the quote until the customer accepts, asks for a change or opts out.

The public StoryBrand website and the working product live in the same application. The product is deliberately SMS-first: secure links open a focused workspace without asking a busy tradie or customer to remember a password.

## Working experiences

- `/app/demo` — Bob’s tradie job inbox, job detail and approve-before-send quote flow
- `/customer/demo/photos` — customer photo capture and safety guidance
- `/customer/demo/quote` — customer quote review, acceptance and change request
- `/operator/demo` — Noah and Jake’s cross-tenant founder console and onboarding flow
- `/api/health` — binding and provider readiness without exposing secrets

Live links use short-lived, hashed access tokens and replace the token-bearing URL with an HttpOnly session cookie after opening.

The tradie workspace also includes self-service **Products & Prices**. A tradie can add, edit, pause, reactivate and delete saved services, parts or labour rates. Active items can be copied directly into a draft quote, while historical quotes keep their original scope and price. Customer uploads are stored in R2 and appear only on the matching tenant-scoped job under **Customer photos**.

## Product boundaries

- AI may capture, summarise and suggest; it cannot send a final quote.
- Quote scope and every price must be reviewed by the tradie.
- Price suggestions can only come from active, human-verified tenant price items.
- The receptionist never diagnoses, promises attendance or gives a price by phone.
- Emergency language tells the caller to move to safety and contact 000 or the relevant emergency service.
- Every tenant-owned row carries a tenant ID and every privileged query is tenant-scoped.
- Provider callbacks are signature-checked and duplicate provider events are recorded idempotently.

## Architecture

```text
Customer call
  → Twilio number and signed voice webhook
  → ConversationRelay WebSocket voice Worker
  → OpenAI short-turn receptionist
  → signed completed-call callback
  → AI structured extraction
  → D1 customer, call and job records
  → Twilio SMS secure link

Tradie secure workspace
  → review captured job
  → edit draft built from verified prices
  → explicit human approval
  → customer review link
  → accept or request a change
  → follow-up queue and audit trail
```

The Vinext application runs on OpenAI Sites with D1 (`DB`) and R2 (`FILES`) bindings. The real-time voice bridge is an independent Cloudflare Worker in `workers/voice`, because a long-lived bidirectional phone WebSocket is a different runtime concern from the website and REST API.

## Local development

Requirements: Node.js 22.13 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Local D1 and R2 bindings are supplied by the Sites/Vite integration. Generate a migration after a schema change with `npm run db:generate`.

## Verification

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Activating real calls

The repository contains no production credentials. Before real callers use the service, create a dedicated TradieRelay Twilio account or sub-account, an Australian voice/SMS number and a dedicated OpenAI project. Follow [docs/PROVIDER_ACTIVATION.md](docs/PROVIDER_ACTIVATION.md).

Until those credentials and the voice Worker are installed, the public demos are fully usable and the Twilio voice route safely falls back to clearly disclosed message-taking mode.
