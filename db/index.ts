import { env } from 'cloudflare:workers';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDb() {
  if (!env.DB) {
    throw new Error('TradieRelay database binding is unavailable.');
  }

  return drizzle(env.DB, { schema });
}

export function getD1() {
  if (!env.DB) {
    throw new Error('TradieRelay database binding is unavailable.');
  }

  return env.DB;
}

export function getFileStore() {
  if (!env.FILES) {
    throw new Error('TradieRelay file storage binding is unavailable.');
  }

  return env.FILES;
}

export function getRuntimeEnv() {
  return env;
}
