import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

const id = () => text('id').primaryKey();
const tenantId = () => text('tenant_id').notNull();
const createdAt = () => text('created_at').notNull();
const updatedAt = () => text('updated_at').notNull();

export const tenants = sqliteTable('tenants', {
  id: id(),
  businessName: text('business_name').notNull(),
  ownerName: text('owner_name').notNull(),
  trade: text('trade').notNull(),
  abn: text('abn'),
  licenceNo: text('licence_no'),
  gstRegistered: integer('gst_registered', { mode: 'boolean' }).notNull().default(false),
  serviceSuburbs: text('service_suburbs', { mode: 'json' }).$type<string[]>().notNull(),
  forwardingFromNumber: text('forwarding_from_number'),
  voiceNumber: text('voice_number'),
  smsNumber: text('sms_number'),
  plan: text('plan').notNull().default('founding'),
  status: text('status').notNull().default('pilot'),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const tenantSettings = sqliteTable('tenant_settings', {
  tenantId: tenantId().primaryKey(),
  greetingName: text('greeting_name').notNull(),
  categories: text('categories', { mode: 'json' }).$type<string[]>().notNull(),
  urgencyKeywords: text('urgency_keywords', { mode: 'json' }).$type<string[]>().notNull(),
  quietHours: text('quiet_hours', { mode: 'json' }).$type<{ start: string; end: string }>().notNull(),
  callRules: text('call_rules', { mode: 'json' }).$type<Record<string, unknown>>().notNull(),
  notificationPhone: text('notification_phone').notNull(),
  weeklyReportDay: integer('weekly_report_day').notNull().default(0),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const tenantUsers = sqliteTable('tenant_users', {
  id: id(),
  tenantId: tenantId(),
  name: text('name').notNull(),
  phoneE164: text('phone_e164').notNull(),
  role: text('role').notNull().default('owner'),
  status: text('status').notNull().default('active'),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [
  uniqueIndex('idx_tenant_users_phone').on(table.tenantId, table.phoneE164),
]);

export const customers = sqliteTable('customers', {
  id: id(),
  tenantId: tenantId(),
  phoneE164: text('phone_e164').notNull(),
  name: text('name'),
  address: text('address'),
  suburb: text('suburb'),
  notes: text('notes'),
  smsOptedOutAt: text('sms_opted_out_at'),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [
  uniqueIndex('idx_customers_tenant_phone').on(table.tenantId, table.phoneE164),
  index('idx_customers_tenant_name').on(table.tenantId, table.name),
]);

export const calls = sqliteTable('calls', {
  id: id(),
  tenantId: tenantId(),
  customerId: text('customer_id'),
  provider: text('provider').notNull(),
  providerCallId: text('provider_call_id'),
  startedAt: text('started_at').notNull(),
  endedAt: text('ended_at'),
  durationSeconds: integer('duration_seconds'),
  outcome: text('outcome').notNull().default('in_progress'),
  recordingUrl: text('recording_url'),
  transcript: text('transcript'),
  extraction: text('extraction', { mode: 'json' }).$type<Record<string, unknown> | null>(),
  confidence: integer('confidence'),
  costCents: integer('cost_cents').notNull().default(0),
  needsHumanReview: integer('needs_human_review', { mode: 'boolean' }).notNull().default(false),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [
  uniqueIndex('idx_calls_provider_call').on(table.provider, table.providerCallId),
  index('idx_calls_tenant_started').on(table.tenantId, table.startedAt),
  index('idx_calls_tenant_review').on(table.tenantId, table.needsHumanReview),
]);

export const jobs = sqliteTable('jobs', {
  id: id(),
  tenantId: tenantId(),
  customerId: text('customer_id').notNull(),
  sourceCallId: text('source_call_id'),
  status: text('status').notNull().default('new'),
  tradeCategory: text('trade_category').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  summary: text('summary').notNull(),
  urgency: text('urgency').notNull().default('standard'),
  suburb: text('suburb'),
  address: text('address'),
  accessNotes: text('access_notes'),
  preferredWindows: text('preferred_windows', { mode: 'json' }).$type<string[]>().notNull(),
  fieldConfidence: text('field_confidence', { mode: 'json' }).$type<Record<string, number>>().notNull(),
  acknowledgedAt: text('acknowledged_at'),
  closedAt: text('closed_at'),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [
  index('idx_jobs_tenant_status').on(table.tenantId, table.status),
  index('idx_jobs_tenant_urgency').on(table.tenantId, table.urgency),
  index('idx_jobs_customer').on(table.customerId),
]);

export const jobPhotos = sqliteTable('job_photos', {
  id: id(),
  tenantId: tenantId(),
  jobId: text('job_id').notNull(),
  storageKey: text('storage_key').notNull(),
  contentType: text('content_type').notNull(),
  sizeBytes: integer('size_bytes').notNull(),
  caption: text('caption'),
  createdAt: createdAt(),
}, (table) => [index('idx_job_photos_job').on(table.jobId)]);

export const priceItems = sqliteTable('price_items', {
  id: id(),
  tenantId: tenantId(),
  name: text('name').notNull(),
  unit: text('unit').notNull(),
  rateExGstCents: integer('rate_ex_gst_cents').notNull(),
  notes: text('notes'),
  active: integer('active', { mode: 'boolean' }).notNull().default(false),
  verifiedBy: text('verified_by'),
  verifiedAt: text('verified_at'),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [index('idx_price_items_tenant_active').on(table.tenantId, table.active)]);

export const quotes = sqliteTable('quotes', {
  id: id(),
  tenantId: tenantId(),
  jobId: text('job_id').notNull(),
  version: integer('version').notNull().default(1),
  status: text('status').notNull().default('draft'),
  subtotalExGstCents: integer('subtotal_ex_gst_cents').notNull().default(0),
  gstCents: integer('gst_cents').notNull().default(0),
  totalCents: integer('total_cents').notNull().default(0),
  customerNote: text('customer_note'),
  validUntil: text('valid_until').notNull(),
  approvalAcknowledged: integer('approval_acknowledged', { mode: 'boolean' }).notNull().default(false),
  approvedBy: text('approved_by'),
  approvedAt: text('approved_at'),
  sentAt: text('sent_at'),
  viewedAt: text('viewed_at'),
  acceptedAt: text('accepted_at'),
  changeRequestedAt: text('change_requested_at'),
  changeRequest: text('change_request'),
  disclaimerVersion: text('disclaimer_version').notNull().default('pilot-v1'),
  publicTokenHash: text('public_token_hash'),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [
  uniqueIndex('idx_quotes_job_version').on(table.jobId, table.version),
  index('idx_quotes_tenant_status').on(table.tenantId, table.status),
]);

export const quoteLineItems = sqliteTable('quote_line_items', {
  id: id(),
  tenantId: tenantId(),
  quoteId: text('quote_id').notNull(),
  priceItemId: text('price_item_id'),
  description: text('description').notNull(),
  quantityMilli: integer('quantity_milli').notNull().default(1000),
  unit: text('unit').notNull(),
  unitRateExGstCents: integer('unit_rate_ex_gst_cents'),
  lineTotalExGstCents: integer('line_total_ex_gst_cents'),
  needsInput: integer('needs_input', { mode: 'boolean' }).notNull().default(false),
  source: text('source').notNull(),
  position: integer('position').notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [index('idx_quote_line_items_quote').on(table.quoteId, table.position)]);

export const messages = sqliteTable('messages', {
  id: id(),
  tenantId: tenantId(),
  direction: text('direction').notNull(),
  channel: text('channel').notNull().default('sms'),
  fromAddress: text('from_address').notNull(),
  toAddress: text('to_address').notNull(),
  body: text('body').notNull(),
  provider: text('provider').notNull(),
  providerMessageId: text('provider_message_id'),
  jobId: text('job_id'),
  quoteId: text('quote_id'),
  deliveryStatus: text('delivery_status').notNull().default('queued'),
  errorCode: text('error_code'),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [
  index('idx_messages_tenant_created').on(table.tenantId, table.createdAt),
  index('idx_messages_job').on(table.jobId),
]);

export const magicTokens = sqliteTable('magic_tokens', {
  id: id(),
  tenantId: tenantId(),
  tokenHash: text('token_hash').notNull(),
  scope: text('scope').notNull(),
  resourceId: text('resource_id'),
  actorType: text('actor_type').notNull(),
  actorId: text('actor_id'),
  expiresAt: text('expires_at').notNull(),
  usedAt: text('used_at'),
  revokedAt: text('revoked_at'),
  createdAt: createdAt(),
}, (table) => [
  uniqueIndex('idx_magic_tokens_hash').on(table.tokenHash),
  index('idx_magic_tokens_tenant_scope').on(table.tenantId, table.scope),
]);

export const followUps = sqliteTable('follow_ups', {
  id: id(),
  tenantId: tenantId(),
  jobId: text('job_id'),
  quoteId: text('quote_id'),
  kind: text('kind').notNull(),
  dueAt: text('due_at').notNull(),
  status: text('status').notNull().default('scheduled'),
  attemptCount: integer('attempt_count').notNull().default(0),
  lastError: text('last_error'),
  completedAt: text('completed_at'),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [index('idx_follow_ups_due').on(table.status, table.dueAt)]);

export const webhookEvents = sqliteTable('webhook_events', {
  id: id(),
  provider: text('provider').notNull(),
  providerEventId: text('provider_event_id').notNull(),
  eventType: text('event_type').notNull(),
  payload: text('payload', { mode: 'json' }).$type<Record<string, unknown>>().notNull(),
  status: text('status').notNull().default('received'),
  error: text('error'),
  processedAt: text('processed_at'),
  createdAt: createdAt(),
}, (table) => [uniqueIndex('idx_webhook_provider_event').on(table.provider, table.providerEventId)]);

export const events = sqliteTable('events', {
  id: id(),
  tenantId: tenantId(),
  actorType: text('actor_type').notNull(),
  actorId: text('actor_id'),
  type: text('type').notNull(),
  resourceType: text('resource_type').notNull(),
  resourceId: text('resource_id').notNull(),
  payload: text('payload', { mode: 'json' }).$type<Record<string, unknown>>().notNull(),
  createdAt: createdAt(),
}, (table) => [
  index('idx_events_tenant_created').on(table.tenantId, table.createdAt),
  index('idx_events_resource').on(table.resourceType, table.resourceId),
]);
