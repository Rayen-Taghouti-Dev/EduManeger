'use client';

import { Calendar, CheckCircle2, Users } from 'lucide-react';

import { schoolOverview } from '@/lib/demo-data';
import { Badge, cn } from '@edumanager/ui';

export function SchoolOverview() {
  const capacityPercent = Math.round(
    (schoolOverview.studentsEnrolled / schoolOverview.capacity) * 100,
  );

  return (
    <section className="widget-card overflow-hidden">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" size="sm" className="shrink-0">
              {schoolOverview.name}
            </Badge>
            <Badge variant="outline" size="sm" className="shrink-0">
              {schoolOverview.term}
            </Badge>
          </div>
          <h1 className="text-foreground truncate text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
            Bonjour Alex
          </h1>
          <p className="text-muted mt-2 text-sm leading-relaxed">
            Voici l&apos;aperçu de votre établissement pour aujourd&apos;hui.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <div
            className={cn(
              'flex h-10 items-center gap-2 rounded-md border px-3',
              schoolOverview.status === 'active'
                ? 'border-success/30 bg-success-light'
                : 'border-warning/30 bg-warning-light',
            )}
          >
            <CheckCircle2 className="text-success h-4 w-4 shrink-0" />
            <span className="text-foreground truncate text-xs font-medium leading-none sm:text-sm">
              {schoolOverview.statusLabel}
            </span>
          </div>

          <div className="flex h-10 items-center gap-2 rounded-md border border-border bg-background-subtle px-3">
            <Users className="text-muted h-4 w-4 shrink-0" />
            <div className="min-w-0">
              <p className="text-foreground text-sm font-semibold leading-none">
                {capacityPercent} %
              </p>
              <p className="text-muted-foreground mt-0.5 truncate text-[10px] leading-none">
                Capacité
              </p>
            </div>
          </div>

          <div className="flex h-10 items-center gap-2 rounded-md border border-border bg-background-subtle px-3">
            <Calendar className="text-muted h-4 w-4 shrink-0" />
            <div className="min-w-0">
              <p className="text-foreground text-sm font-semibold leading-none">
                {schoolOverview.daysRemaining}
              </p>
              <p className="text-muted-foreground mt-0.5 truncate text-[10px] leading-none">
                Jours restants
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
