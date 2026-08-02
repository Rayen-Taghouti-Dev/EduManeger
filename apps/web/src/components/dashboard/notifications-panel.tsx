'use client';

import { notificationMeta } from '@/lib/demo-data';
import { useI18n } from '@/providers/locale-provider';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@edumanager/ui';

export function NotificationsPanel() {
  const { t } = useI18n();
  const unreadCount = notificationMeta.filter((n) => n.unread).length;
  const unreadLabel =
    unreadCount > 1
      ? t('dashboard.unreadMany', { count: unreadCount })
      : t('dashboard.unreadOne', { count: unreadCount });

  return (
    <Card className="card-hover flex h-full flex-col">
      <CardHeader className="shrink-0 pb-0">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="text-sm font-semibold leading-none">
              {t('dashboard.notificationsTitle')}
            </CardTitle>
            <CardDescription className="text-xs">{t('dashboard.notificationsDesc')}</CardDescription>
          </div>
          <Badge variant="secondary" size="sm" className="shrink-0">
            {unreadLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden pt-4">
        <ul className="divide-border divide-y">
          {notificationMeta.map((n) => (
            <li key={n.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex min-w-0 items-start justify-between gap-2">
                <p className="truncate text-sm font-medium">{t(n.titleKey)}</p>
                {n.unread ? (
                  <span className="bg-primary mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                ) : null}
              </div>
              <p className="text-muted mt-0.5 line-clamp-2 text-xs">{t(n.descKey)}</p>
              <p className="text-muted-foreground mt-1 text-[10px]">{t(n.timeKey)}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
