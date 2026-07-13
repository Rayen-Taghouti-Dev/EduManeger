'use client';

import { Bell, CheckCheck } from 'lucide-react';

import { notifications } from '@/lib/demo-data';
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
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'relative text-muted-foreground hover:bg-surface-hover hover:text-foreground',
            className,
          )}
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="bg-danger absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-0.5 text-[10px] font-semibold leading-none text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between gap-2">
          <span className="text-sm leading-none">Notifications</span>
          <Badge variant="secondary" size="sm" className="shrink-0">
            {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''}
          </Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((n) => (
          <DropdownMenuItem
            key={n.id}
            className="flex cursor-default flex-col items-start gap-1 px-3 py-2.5"
          >
            <div className="flex w-full min-w-0 items-center justify-between gap-2">
              <span className="truncate text-sm font-medium leading-snug">{n.title}</span>
              {n.unread && <span className="bg-primary h-1.5 w-1.5 shrink-0 rounded-full" />}
            </div>
            <span className="text-muted line-clamp-2 w-full text-xs leading-relaxed">
              {n.description}
            </span>
            <span className="text-muted-foreground text-[10px] leading-none">{n.time}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-primary min-h-10 items-center justify-center gap-2 text-xs font-medium">
          <CheckCheck className="h-3.5 w-3.5 shrink-0" />
          Tout marquer comme lu
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
