'use client';

import { Menu } from 'lucide-react';

import { LanguageSwitcher } from '@/components/language-switcher';
import { useI18n } from '@/providers/locale-provider';
import { useShellStore } from '@/stores/shell-store';
import { Button, ThemeSwitcher, cn } from '@edumanager/ui';

import { CommandMenu } from './command-menu';
import { NotificationsMenu } from './notifications-menu';
import { SchoolSelector } from './school-selector';
import { UserMenu } from './user-menu';

const iconBtn =
  'h-10 w-10 shrink-0 text-muted-foreground hover:bg-surface-hover hover:text-foreground';

export function Navbar() {
  const { toggleMobileSidebar } = useShellStore();
  const { t } = useI18n();

  return (
    <header className="bg-surface/90 border-border sticky top-0 z-[var(--z-navbar)] flex h-[var(--navbar-height)] shrink-0 items-center gap-1.5 border-b px-3 backdrop-blur-md sm:gap-2 sm:px-4 lg:gap-3">
      <Button
        variant="ghost"
        size="icon"
        className={cn(iconBtn, 'lg:hidden')}
        onClick={toggleMobileSidebar}
        aria-label={t('nav.openMenu')}
      >
        <Menu className="h-4 w-4" />
      </Button>

      <SchoolSelector />

      <div className="hidden min-w-0 flex-1 items-center lg:flex lg:justify-center">
        <CommandMenu />
      </div>

      <div className="ml-auto flex min-w-0 shrink-0 items-center gap-1 sm:gap-2">
        <div className="flex items-center lg:hidden">
          <CommandMenu compact />
        </div>
        <NotificationsMenu className={iconBtn} />
        <LanguageSwitcher compact className={iconBtn} />
        <ThemeSwitcher className={iconBtn} />
        <UserMenu />
      </div>
    </header>
  );
}
