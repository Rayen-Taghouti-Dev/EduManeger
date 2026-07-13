'use client';

import { CreditCard, GraduationCap, UserPlus, Users } from 'lucide-react';

import { activityFeed } from '@/lib/demo-data';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
} from '@edumanager/ui';

const typeIcons = {
  enrollment: GraduationCap,
  grade: GraduationCap,
  payment: CreditCard,
  teacher: UserPlus,
  attendance: Users,
};

const statusStyles = {
  success: 'bg-success',
  info: 'bg-secondary',
  warning: 'bg-warning',
};

export function ActivityFeed() {
  return (
    <Card className="card-hover flex h-full flex-col">
      <CardHeader className="shrink-0 pb-0">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="text-sm font-semibold leading-none">Activité récente</CardTitle>
            <CardDescription className="text-xs">Dernières mises à jour de votre établissement</CardDescription>
          </div>
          <Badge variant="outline" size="sm" className="shrink-0">
            En direct
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden pt-4">
        <ul className="divide-border divide-y">
          {activityFeed.map((item) => {
            const Icon = typeIcons[item.type];
            return (
              <li
                key={item.id}
                className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="relative shrink-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary-light text-primary text-[11px] font-medium">
                      {item.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={cn(
                      'absolute -right-0.5 -bottom-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-surface',
                      statusStyles[item.status],
                    )}
                  >
                    <Icon className="h-2 w-2 text-white" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium leading-snug">{item.title}</p>
                  <p className="text-muted line-clamp-1 text-xs leading-relaxed">{item.description}</p>
                  <p className="text-muted-foreground mt-1 truncate text-[10px] leading-none">
                    {item.user} · {item.time}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
