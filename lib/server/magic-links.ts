import { and, eq, gt, isNull } from 'drizzle-orm';
import { getDb, getRuntimeEnv } from '@/db';
import { magicTokens } from '@/db/schema';
import { createId, createOpaqueToken, hashOpaqueToken } from './ids';

export type MagicScope = 'tradie_workspace' | 'view_job' | 'upload_photos' | 'review_quote' | 'operator';

type IssueTokenInput = {
  tenantId: string;
  scope: MagicScope;
  actorType: 'tenant_user' | 'customer' | 'operator';
  actorId?: string | null;
  resourceId?: string | null;
  expiresInMinutes: number;
};

export async function issueMagicToken(input: IssueTokenInput) {
  const token = createOpaqueToken();
  const tokenHash = await hashOpaqueToken(token, getRuntimeEnv().TOKEN_PEPPER ?? '');
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + input.expiresInMinutes * 60_000).toISOString();

  await getDb().insert(magicTokens).values({
    id: createId('tok'),
    tenantId: input.tenantId,
    tokenHash,
    scope: input.scope,
    resourceId: input.resourceId ?? null,
    actorType: input.actorType,
    actorId: input.actorId ?? null,
    expiresAt,
    usedAt: null,
    revokedAt: null,
    createdAt,
  });

  return { token, expiresAt };
}

export async function validateMagicToken(token: string, allowedScopes: MagicScope[]) {
  const tokenHash = await hashOpaqueToken(token, getRuntimeEnv().TOKEN_PEPPER ?? '');
  const row = await getDb().query.magicTokens.findFirst({
    where: and(
      eq(magicTokens.tokenHash, tokenHash),
      gt(magicTokens.expiresAt, new Date().toISOString()),
      isNull(magicTokens.revokedAt),
    ),
  });

  if (!row || !allowedScopes.includes(row.scope as MagicScope)) return null;
  return row;
}
