'use client';

import { notifications } from '@/lib/demo-data';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@edumanager/ui';

export function NotificationsPanel() {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <Card className="card-hover flex h-full flex-col">
      <CardHeader className="shrink-0 pb-0">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="text-sm font-semibold leading-none">Notifications</CardTitle>
            <CardDescription className="text-xs">Nécessitent votre attention</CardDescription>
          </div>
          <Badge variant="secondary" size="sm" className="shrink-0">
            {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden pt-4">
        <ul className="divide-border divide-y">
          {notifications.map((n) => (
            <li key={n.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex min-w-0 items-start justify-between gap-2">
                <p className="truncate text-sm font-medium">{n.title}</p>
                {n.unread && <span className="bg-primary mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />}
              </div>
              <p className="text-muted line-clamp-2 mt-0.5 text-xs">{n.description}</p>
              <p className="text-muted-foreground mt-1 text-[10px]">{n.time}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
