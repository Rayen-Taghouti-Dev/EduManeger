'use client';

import { useEffect } from 'react';

import { Sidebar } from '@/components/shell/sidebar';
import { useShellStore } from '@/stores/shell-store';
import { cn } from '@edumanager/ui';

export function MobileSidebar() {
  const { mobileSidebarOpen, setMobileSidebarOpen } = useShellStore();

  useEffect(() => {
    if (!mobileSidebarOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileSidebarOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileSidebarOpen, setMobileSidebarOpen]);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-[var(--z-sidebar-mobile)] bg-black/50 transition-opacity duration-200 lg:hidden',
          mobileSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setMobileSidebarOpen(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          'bg-surface fixed inset-y-0 left-0 z-[calc(var(--z-sidebar-mobile)+1)] w-[min(var(--sidebar-width),calc(100vw-3rem))] max-w-[20rem] shadow-lg transition-transform duration-200 ease-out lg:hidden',
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileSidebarOpen}
      >
        <Sidebar mobile onNavigate={() => setMobileSidebarOpen(false)} />
      </div>
    </>
  );
}
