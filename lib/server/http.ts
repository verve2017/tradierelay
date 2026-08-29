export function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('content-type', 'application/json; charset=utf-8');
  headers.set('cache-control', 'no-store');
  return new Response(JSON.stringify(data), { ...init, headers });
}

export function problem(status: number, code: string, message: string) {
  return json({ ok: false, error: { code, message } }, { status });
}

export async function readJsonObject(request: Request, maxBytes = 64_000) {
  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new Error('REQUEST_TOO_LARGE');
  }

  const text = await request.text();
  if (text.length > maxBytes) throw new Error('REQUEST_TOO_LARGE');
  const value: unknown = JSON.parse(text);
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('INVALID_JSON_OBJECT');
  return value as Record<string, unknown>;
}

export function getBearerToken(request: Request) {
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) return null;
  return authorization.slice(7).trim() || null;
}

export function getRequestToken(request: Request) {
  return getBearerToken(request) ?? getCookie(request, 'tr_access') ?? new URL(request.url).searchParams.get('token');
}

function getCookie(request: Request, name: string) {
  const cookie = request.headers.get('cookie');
  if (!cookie) return null;
  for (const part of cookie.split(';')) {
    const [key, ...value] = part.trim().split('=');
    if (key === name) return decodeURIComponent(value.join('='));
  }
  return null;
}
