'use client';

import { Building2 } from 'lucide-react';

import { useAuth } from '@/providers/auth-provider';
import { useI18n } from '@/providers/locale-provider';
import { Button } from '@edumanager/ui';

export function SchoolSelector() {
  const { currentUser } = useAuth();
  const { t } = useI18n();

  return (
    <Button
      variant="outline"
      className="hidden h-10 max-w-[min(14rem,40vw)] shrink-0 items-center gap-2 px-3 font-normal lg:inline-flex xl:max-w-[260px]"
      disabled
    >
      <Building2 className="text-primary h-4 w-4 shrink-0" />
      <span className="min-w-0 flex-1 truncate text-left text-sm leading-none">
        {currentUser?.school.name ?? t('school.fallback')}
      </span>
      <span className="text-muted-foreground hidden truncate text-xs uppercase xl:inline">
        {currentUser?.role.replace('_', ' ') ?? 'Session'}
      </span>
    </Button>
  );
}
