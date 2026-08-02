'use client';

import { CreditCard, GraduationCap, School, UserPlus } from 'lucide-react';

import { useI18n } from '@/providers/locale-provider';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@edumanager/ui';

export function QuickActions() {
  const { t } = useI18n();

  const actions = [
    { label: t('dashboard.actionAddStudent'), icon: GraduationCap, variant: 'default' as const },
    { label: t('dashboard.actionAddTeacher'), icon: UserPlus, variant: 'outline' as const },
    { label: t('dashboard.actionCreateClass'), icon: School, variant: 'outline' as const },
    { label: t('dashboard.actionRecordPayment'), icon: CreditCard, variant: 'outline' as const },
  ];

  return (
    <Card className="card-hover flex h-full flex-col">
      <CardHeader className="shrink-0 pb-0">
        <CardTitle className="text-sm font-semibold leading-none">
          {t('dashboard.quickActionsTitle')}
        </CardTitle>
        <CardDescription className="text-xs">{t('dashboard.quickActionsDesc')}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        <div className="flex flex-col gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                variant={action.variant}
                className="h-10 w-full min-w-0 items-center justify-start gap-3 px-3"
                disabled
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate text-left text-sm leading-none">
                  {action.label}
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
