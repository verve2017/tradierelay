export type NotificationRoute = { phone: string; reason: 'primary' | 'urgent_copy' | 'delivery_fallback' };

function phoneValue(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 30) : '';
}

export function resolveNotificationRoutes(input: {
  ownerPhone?: string | null;
  notificationPhone?: string | null;
  callRules?: Record<string, unknown> | null;
  urgency: string;
  primaryDeliveryFailed?: boolean;
}): NotificationRoute[] {
  const primary = phoneValue(input.notificationPhone) || phoneValue(input.ownerPhone);
  const backup = phoneValue(input.callRules?.backupNotificationPhone);
  const urgent = input.urgency === 'urgent' || input.urgency === 'emergency';
  const notifyBackup = input.callRules?.urgentNotifyBackup === true;
  const routes: NotificationRoute[] = primary ? [{ phone: primary, reason: 'primary' }] : [];
  if (backup && backup !== primary && ((urgent && notifyBackup) || input.primaryDeliveryFailed)) {
    routes.push({ phone: backup, reason: input.primaryDeliveryFailed ? 'delivery_fallback' : 'urgent_copy' });
  }
  return routes;
}
