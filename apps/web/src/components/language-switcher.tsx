'use client';

import { Languages } from 'lucide-react';

import { useI18n } from '@/providers/locale-provider';
import type { Locale } from '@/i18n';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  cn,
} from '@edumanager/ui';

interface LanguageSwitcherProps {
  className?: string;
  /** Compact icon-only control (navbar). Default shows FR | EN pill. */
  compact?: boolean;
}

const options: { value: Locale; short: string; labelKey: 'language.fr' | 'language.en' }[] = [
  { value: 'fr', short: 'FR', labelKey: 'language.fr' },
  { value: 'en', short: 'EN', labelKey: 'language.en' },
];

export function LanguageSwitcher({ className, compact = false }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n();

  if (compact) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-10 w-10 shrink-0', className)}
            aria-label={t('language.label')}
          >
            <Languages className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setLocale(option.value)}
              className={cn('gap-2', locale === option.value && 'bg-primary-light text-primary')}
            >
              <span className="font-semibold tracking-wide">{option.short}</span>
              {t(option.labelKey)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className={cn(
        'border-border bg-surface inline-flex h-9 items-center rounded-full border p-0.5 shadow-[var(--shadow-sm)]',
        className,
      )}
    >
      {options.map((option) => {
        const active = locale === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLocale(option.value)}
            aria-pressed={active}
            aria-label={t('language.switchTo', { lang: t(option.labelKey) })}
            className={cn(
              'focus-visible:ring-ring inline-flex h-8 min-w-10 items-center justify-center rounded-full px-3 text-xs font-semibold tracking-wide transition-all duration-150 focus-visible:ring-2 focus-visible:outline-none',
              active
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background-subtle',
            )}
          >
            {option.short}
          </button>
        );
      })}
    </div>
  );
}
