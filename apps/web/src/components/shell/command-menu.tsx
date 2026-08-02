'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

import { navGroups } from '@/config/navigation';
import { useI18n } from '@/providers/locale-provider';
import { Button } from '@edumanager/ui';

const commands = navGroups
  .flatMap((g) => g.items)
  .filter((item) =>
    ['/dashboard', '/students', '/teachers', '/finance', '/settings'].includes(item.href),
  );

interface CommandMenuProps {
  compact?: boolean;
}

export function CommandMenu({ compact = false }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { t } = useI18n();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      {compact ? (
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 shrink-0 text-muted-foreground hover:bg-surface-hover hover:text-foreground"
          onClick={() => setOpen(true)}
          aria-label={t('command.searchPlaceholder')}
        >
          <Search className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="outline"
          className="text-muted-foreground h-10 w-full max-w-sm items-center justify-start gap-2 px-3 font-normal"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4 shrink-0" />
          <span className="min-w-0 flex-1 truncate text-left text-sm leading-none">
            {t('common.search')}...
          </span>
          <kbd className="bg-background-subtle pointer-events-none ml-auto inline-flex h-5 shrink-0 items-center justify-center rounded border px-1.5 font-mono text-[10px] font-medium leading-none">
            ⌘K
          </kbd>
        </Button>
      )}

      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-label={t('command.searchPlaceholder')}
            className="bg-surface fixed top-[12%] left-1/2 z-50 w-[calc(100%-1rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-lg border shadow-lg sm:top-[20%] sm:w-[calc(100%-2rem)]"
          >
            <div className="border-border flex h-12 items-center border-b px-4">
              <input
                autoFocus
                placeholder={t('command.searchPlaceholder')}
                className="placeholder:text-muted-foreground w-full bg-transparent text-sm leading-none outline-none"
              />
            </div>
            <div className="max-h-64 overflow-y-auto p-2">
              <p className="text-muted-foreground px-2 py-2 text-[11px] font-semibold tracking-wider uppercase">
                {t('nav.main')}
              </p>
              {commands.map((cmd) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.href}
                    onClick={() => {
                      router.push(cmd.href);
                      setOpen(false);
                    }}
                    className="hover:bg-surface-hover focus-visible:bg-surface-hover flex h-10 w-full min-w-0 items-center gap-3 rounded-md px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Icon className="text-muted h-4 w-4 shrink-0" />
                    <span className="truncate text-left leading-none">{t(cmd.titleKey)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
