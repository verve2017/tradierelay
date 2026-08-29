CREATE TABLE `calls` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`customer_id` text,
	`provider` text NOT NULL,
	`provider_call_id` text,
	`started_at` text NOT NULL,
	`ended_at` text,
	`duration_seconds` integer,
	`outcome` text DEFAULT 'in_progress' NOT NULL,
	`recording_url` text,
	`transcript` text,
	`extraction` text,
	`confidence` integer,
	`cost_cents` integer DEFAULT 0 NOT NULL,
	`needs_human_review` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_calls_provider_call` ON `calls` (`provider`,`provider_call_id`);--> statement-breakpoint
CREATE INDEX `idx_calls_tenant_started` ON `calls` (`tenant_id`,`started_at`);--> statement-breakpoint
CREATE INDEX `idx_calls_tenant_review` ON `calls` (`tenant_id`,`needs_human_review`);--> statement-breakpoint
CREATE TABLE `customers` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`phone_e164` text NOT NULL,
	`name` text,
	`address` text,
	`suburb` text,
	`notes` text,
	`sms_opted_out_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_customers_tenant_phone` ON `customers` (`tenant_id`,`phone_e164`);--> statement-breakpoint
CREATE INDEX `idx_customers_tenant_name` ON `customers` (`tenant_id`,`name`);--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`actor_type` text NOT NULL,
	`actor_id` text,
	`type` text NOT NULL,
	`resource_type` text NOT NULL,
	`resource_id` text NOT NULL,
	`payload` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_events_tenant_created` ON `events` (`tenant_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_events_resource` ON `events` (`resource_type`,`resource_id`);--> statement-breakpoint
CREATE TABLE `follow_ups` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`job_id` text,
	`quote_id` text,
	`kind` text NOT NULL,
	`due_at` text NOT NULL,
	`status` text DEFAULT 'scheduled' NOT NULL,
	`attempt_count` integer DEFAULT 0 NOT NULL,
	`last_error` text,
	`completed_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_follow_ups_due` ON `follow_ups` (`status`,`due_at`);--> statement-breakpoint
CREATE TABLE `job_photos` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`job_id` text NOT NULL,
	`storage_key` text NOT NULL,
	`content_type` text NOT NULL,
	`size_bytes` integer NOT NULL,
	`caption` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_job_photos_job` ON `job_photos` (`job_id`);--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`customer_id` text NOT NULL,
	`source_call_id` text,
	`status` text DEFAULT 'new' NOT NULL,
	`trade_category` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`summary` text NOT NULL,
	`urgency` text DEFAULT 'standard' NOT NULL,
	`suburb` text,
	`address` text,
	`access_notes` text,
	`preferred_windows` text NOT NULL,
	`field_confidence` text NOT NULL,
	`acknowledged_at` text,
	`closed_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_jobs_tenant_status` ON `jobs` (`tenant_id`,`status`);--> statement-breakpoint
CREATE INDEX `idx_jobs_tenant_urgency` ON `jobs` (`tenant_id`,`urgency`);--> statement-breakpoint
CREATE INDEX `idx_jobs_customer` ON `jobs` (`customer_id`);--> statement-breakpoint
CREATE TABLE `magic_tokens` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`token_hash` text NOT NULL,
	`scope` text NOT NULL,
	`resource_id` text,
	`actor_type` text NOT NULL,
	`actor_id` text,
	`expires_at` text NOT NULL,
	`used_at` text,
	`revoked_at` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_magic_tokens_hash` ON `magic_tokens` (`token_hash`);--> statement-breakpoint
CREATE INDEX `idx_magic_tokens_tenant_scope` ON `magic_tokens` (`tenant_id`,`scope`);--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`direction` text NOT NULL,
	`channel` text DEFAULT 'sms' NOT NULL,
	`from_address` text NOT NULL,
	`to_address` text NOT NULL,
	`body` text NOT NULL,
	`provider` text NOT NULL,
	`provider_message_id` text,
	`job_id` text,
	`quote_id` text,
	`delivery_status` text DEFAULT 'queued' NOT NULL,
	`error_code` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_messages_tenant_created` ON `messages` (`tenant_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_messages_job` ON `messages` (`job_id`);--> statement-breakpoint
CREATE TABLE `price_items` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`name` text NOT NULL,
	`unit` text NOT NULL,
	`rate_ex_gst_cents` integer NOT NULL,
	`notes` text,
	`active` integer DEFAULT false NOT NULL,
	`verified_by` text,
	`verified_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_price_items_tenant_active` ON `price_items` (`tenant_id`,`active`);--> statement-breakpoint
CREATE TABLE `quote_line_items` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`quote_id` text NOT NULL,
	`price_item_id` text,
	`description` text NOT NULL,
	`quantity_milli` integer DEFAULT 1000 NOT NULL,
	`unit` text NOT NULL,
	`unit_rate_ex_gst_cents` integer,
	`line_total_ex_gst_cents` integer,
	`needs_input` integer DEFAULT false NOT NULL,
	`source` text NOT NULL,
	`position` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_quote_line_items_quote` ON `quote_line_items` (`quote_id`,`position`);--> statement-breakpoint
CREATE TABLE `quotes` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`job_id` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`subtotal_ex_gst_cents` integer DEFAULT 0 NOT NULL,
	`gst_cents` integer DEFAULT 0 NOT NULL,
	`total_cents` integer DEFAULT 0 NOT NULL,
	`customer_note` text,
	`valid_until` text NOT NULL,
	`approval_acknowledged` integer DEFAULT false NOT NULL,
	`approved_by` text,
	`approved_at` text,
	`sent_at` text,
	`viewed_at` text,
	`accepted_at` text,
	`change_requested_at` text,
	`change_request` text,
	`disclaimer_version` text DEFAULT 'pilot-v1' NOT NULL,
	`public_token_hash` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_quotes_job_version` ON `quotes` (`job_id`,`version`);--> statement-breakpoint
CREATE INDEX `idx_quotes_tenant_status` ON `quotes` (`tenant_id`,`status`);--> statement-breakpoint
CREATE TABLE `tenant_settings` (
	`tenant_id` text PRIMARY KEY NOT NULL,
	`greeting_name` text NOT NULL,
	`categories` text NOT NULL,
	`urgency_keywords` text NOT NULL,
	`quiet_hours` text NOT NULL,
	`call_rules` text NOT NULL,
	`notification_phone` text NOT NULL,
	`weekly_report_day` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tenant_users` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`name` text NOT NULL,
	`phone_e164` text NOT NULL,
	`role` text DEFAULT 'owner' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_tenant_users_phone` ON `tenant_users` (`tenant_id`,`phone_e164`);--> statement-breakpoint
CREATE TABLE `tenants` (
	`id` text PRIMARY KEY NOT NULL,
	`business_name` text NOT NULL,
	`owner_name` text NOT NULL,
	`trade` text NOT NULL,
	`abn` text,
	`licence_no` text,
	`gst_registered` integer DEFAULT false NOT NULL,
	`service_suburbs` text NOT NULL,
	`forwarding_from_number` text,
	`voice_number` text,
	`sms_number` text,
	`plan` text DEFAULT 'founding' NOT NULL,
	`status` text DEFAULT 'pilot' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `webhook_events` (
	`id` text PRIMARY KEY NOT NULL,
	`provider` text NOT NULL,
	`provider_event_id` text NOT NULL,
	`event_type` text NOT NULL,
	`payload` text NOT NULL,
	`status` text DEFAULT 'received' NOT NULL,
	`error` text,
	`processed_at` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_webhook_provider_event` ON `webhook_events` (`provider`,`provider_event_id`);--> statement-breakpoint
PRAGMA optimize;
