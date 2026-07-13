'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import * as React from 'react';

import { Button } from '../components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/dropdown-menu';
import { cn } from '../lib/utils';
import { useTheme, type Theme } from '../providers/theme-provider';

const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Clair', icon: <Sun className="h-4 w-4" /> },
  { value: 'dark', label: 'Sombre', icon: <Moon className="h-4 w-4" /> },
  { value: 'system', label: 'Système', icon: <Monitor className="h-4 w-4" /> },
];

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn('h-10 w-10 shrink-0', className)}
          aria-label="Changer le thème"
        >
          {resolvedTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={cn(
              'gap-2',
              theme === t.value ? 'bg-primary-light text-primary' : '',
            )}
          >
            {t.icon}
            {t.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
