'use client';

import { DashboardGuard } from '@/components/auth/dashboard-guard';
import { AppShell } from '@/components/shell/app-shell';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardGuard>
      <AppShell>{children}</AppShell>
    </DashboardGuard>
  );
}
