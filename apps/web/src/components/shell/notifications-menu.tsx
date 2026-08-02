'use client';

import { Bell, CheckCheck } from 'lucide-react';

import { notificationMeta } from '@/lib/demo-data';
import { useI18n } from '@/providers/locale-provider';
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  cn,
} from '@edumanager/ui';

interface NotificationsMenuProps {
  className?: string;
}

export function NotificationsMenu({ className }: NotificationsMenuProps) {
  const { t } = useI18n();
  const unreadCount = notificationMeta.filter((n) => n.unread).length;
  const unreadLabel =
    unreadCount > 1
      ? t('dashboard.unreadMany', { count: unreadCount })
      : t('dashboard.unreadOne', { count: unreadCount });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'text-muted-foreground hover:bg-surface-hover hover:text-foreground relative',
            className,
          )}
          aria-label={t('dashboard.notificationsTitle')}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 ? (
            <span className="bg-danger absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-0.5 text-[10px] leading-none font-semibold text-white">
              {unreadCount}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 max-w-[min(20rem,calc(100vw-1rem))]"
      >
        <DropdownMenuLabel className="flex items-center justify-between gap-2">
          <span className="text-sm leading-none">{t('dashboard.notificationsTitle')}</span>
          <Badge variant="secondary" size="sm" className="shrink-0">
            {unreadLabel}
          </Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notificationMeta.map((n) => (
          <DropdownMenuItem
            key={n.id}
            className="flex cursor-default flex-col items-start gap-1 px-3 py-2.5"
          >
            <div className="flex w-full min-w-0 items-center justify-between gap-2">
              <span className="truncate text-sm leading-snug font-medium">{t(n.titleKey)}</span>
              {n.unread ? <span className="bg-primary h-1.5 w-1.5 shrink-0 rounded-full" /> : null}
            </div>
            <span className="text-muted line-clamp-2 w-full text-xs leading-relaxed">
              {t(n.descKey)}
            </span>
            <span className="text-muted-foreground text-[10px] leading-none">{t(n.timeKey)}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-primary min-h-10 items-center justify-center gap-2 text-xs font-medium">
          <CheckCheck className="h-3.5 w-3.5 shrink-0" />
          {t('dashboard.markAllRead')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
