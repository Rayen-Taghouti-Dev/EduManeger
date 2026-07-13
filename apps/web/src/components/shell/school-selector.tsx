'use client';

import { Building2 } from 'lucide-react';

import { useAuth } from '@/providers/auth-provider';
import { Button } from '@edumanager/ui';

export function SchoolSelector() {
  const { currentUser } = useAuth();

  return (
    <Button
      variant="outline"
      className="hidden h-10 max-w-[260px] shrink-0 items-center gap-2 px-3 font-normal sm:inline-flex"
      disabled
    >
      <Building2 className="text-primary h-4 w-4 shrink-0" />
      <span className="min-w-0 flex-1 truncate text-left text-sm leading-none">
        {currentUser?.school.name ?? 'Établissement'}
      </span>
      <span className="text-muted-foreground truncate text-xs uppercase">
        {currentUser?.role.replace('_', ' ') ?? 'Session'}
      </span>
    </Button>
  );
}
