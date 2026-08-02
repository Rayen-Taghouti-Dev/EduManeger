'use client';

import { Activity, GraduationCap, School, TrendingDown, TrendingUp, Users } from 'lucide-react';

import { kpiMeta } from '@/lib/demo-data';
import { useI18n } from '@/providers/locale-provider';
import { cn } from '@edumanager/ui';

const iconMap = {
  students: GraduationCap,
  teachers: Users,
  classes: School,
  attendance: Activity,
};

const accentMap = {
  primary: 'text-primary bg-primary-light',
  secondary: 'text-secondary bg-secondary-light',
  success: 'text-success bg-success-light',
  warning: 'text-warning bg-warning-light',
};

export function KpiCards() {
  const { t } = useI18n();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpiMeta.map((kpi) => {
        const Icon = iconMap[kpi.icon];
        const isUp = kpi.trend === 'up';

        return (
          <div key={kpi.id} className="widget-card-hover p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-md',
                  accentMap[kpi.accent],
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div
                className={cn(
                  'inline-flex min-h-5 shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium leading-none',
                  isUp ? 'bg-success-light text-success' : 'bg-danger-light text-danger',
                )}
              >
                {isUp ? (
                  <TrendingUp className="h-3 w-3 shrink-0" />
                ) : (
                  <TrendingDown className="h-3 w-3 shrink-0" />
                )}
                {kpi.change}
              </div>
            </div>
            <div className="mt-4 min-w-0">
              <p className="text-muted-foreground truncate text-xs font-medium leading-none">
                {t(kpi.titleKey)}
              </p>
              <p className="text-foreground mt-2 truncate text-2xl font-semibold leading-none tracking-tight">
                {kpi.value}
              </p>
              <p className="text-muted-foreground mt-1 truncate text-[10px] leading-none">
                {t(kpi.periodKey)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
