export function normaliseAustralianMobile(value: unknown) {
  if (typeof value !== 'string') return null;
  let phone = value.trim().replace(/[\s()-]/gu, '');
  if (phone.startsWith('04')) phone = `+61${phone.slice(1)}`;
  else if (phone.startsWith('614')) phone = `+${phone}`;
  return /^\+614\d{8}$/u.test(phone) ? phone : null;
}
