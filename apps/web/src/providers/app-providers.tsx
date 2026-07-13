'use client';

import { AuthProvider } from '@/providers/auth-provider';
import { QueryProvider } from '@/providers/query-provider';
import { ToastProvider } from '@/providers/toast-provider';
import { ThemeProvider, TooltipProvider } from '@edumanager/ui';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <QueryProvider>
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
        </QueryProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
