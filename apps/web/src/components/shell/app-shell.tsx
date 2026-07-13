'use client';

import { Sidebar } from '@/components/shell/sidebar';
import { Navbar } from '@/components/shell/navbar';
import { MobileSidebar } from '@/components/shell/mobile-sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="bg-background relative isolate z-[var(--z-shell)] flex h-dvh overflow-hidden">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
