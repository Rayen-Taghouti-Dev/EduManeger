'use client';

import { CalendarDays, MapPin } from 'lucide-react';

import { eventMeta } from '@/lib/demo-data';
import { useI18n } from '@/providers/locale-provider';
import type { MessageKey } from '@/i18n';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, cn } from '@edumanager/ui';

const typeLabelKeys: Record<'meeting' | 'event' | 'admin', MessageKey> = {
  meeting: 'dashboard.typeMeeting',
  event: 'dashboard.typeEvent',
  admin: 'dashboard.typeAdmin',
};

const typeStyles = {
  meeting: 'bg-primary-light text-primary',
  event: 'bg-secondary-light text-secondary',
  admin: 'bg-warning-light text-warning',
};

export function UpcomingEvents() {
  const { t } = useI18n();

  return (
    <Card className="card-hover flex h-full flex-col">
      <CardHeader className="shrink-0 pb-0">
        <CardTitle className="text-sm font-semibold leading-none">{t('dashboard.eventsTitle')}</CardTitle>
        <CardDescription className="text-xs">{t('dashboard.eventsDesc')}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden pt-4">
        <ul className="divide-border divide-y">
          {eventMeta.map((event) => {
            const date = t(event.dateKey);
            const [day, month] = date.split(' ');
            return (
              <li key={event.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                <div className="bg-background-subtle flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-md border">
                  <span className="text-muted-foreground text-[9px] font-medium uppercase leading-none">
                    {month}
                  </span>
                  <span className="text-foreground text-sm font-semibold leading-none">{day}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-sm leading-snug font-medium">{t(event.titleKey)}</p>
                    <Badge
                      variant="secondary"
                      size="sm"
                      className={cn('shrink-0', typeStyles[event.type])}
                    >
                      {t(typeLabelKeys[event.type])}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px]">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3 shrink-0" />
                      {t(event.timeKey)}
                    </span>
                    <span className="flex min-w-0 items-center gap-1">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{t(event.locationKey)}</span>
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
