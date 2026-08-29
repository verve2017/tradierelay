import { getRuntimeEnv } from '@/db';
import { getRequestToken } from './http';
import { timingSafeEqual } from './ids';
import { validateMagicToken, type MagicScope } from './magic-links';

export async function requireMagicAccess(request: Request, scopes: MagicScope[]) {
  const token = getRequestToken(request);
  if (!token) return null;
  return validateMagicToken(token, scopes);
}

export async function requireOperatorAccess(request: Request) {
  const token = getRequestToken(request);
  if (!token) return null;

  const operatorKey = getRuntimeEnv().OPERATOR_ACCESS_KEY;
  if (operatorKey && timingSafeEqual(token, operatorKey)) {
    return { actorType: 'operator' as const, actorId: 'operator-key', tenantId: null };
  }

  const magic = await validateMagicToken(token, ['operator']);
  if (!magic) return null;
  return { actorType: 'operator' as const, actorId: magic.actorId ?? magic.id, tenantId: magic.tenantId };
}
