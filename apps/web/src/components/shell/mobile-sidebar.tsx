'use client';

import { Sidebar } from '@/components/shell/sidebar';
import { useShellStore } from '@/stores/shell-store';
import { cn } from '@edumanager/ui';

export function MobileSidebar() {
  const { mobileSidebarOpen, setMobileSidebarOpen } = useShellStore();

  if (!mobileSidebarOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[var(--z-sidebar-mobile)] bg-black/50 lg:hidden"
        onClick={() => setMobileSidebarOpen(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          'bg-surface fixed inset-y-0 left-0 z-[calc(var(--z-sidebar-mobile)+1)] w-[var(--sidebar-width)] shadow-lg lg:hidden',
        )}
      >
        <Sidebar mobile onNavigate={() => setMobileSidebarOpen(false)} />
      </div>
    </>
  );
}
