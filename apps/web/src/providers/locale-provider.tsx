'use client';

import { createContext, useContext, useEffect, useMemo } from 'react';

import {
  translate,
  type Locale,
  type MessageKey,
} from '@/i18n';
import { useLocaleStore } from '@/stores/locale-store';

type TranslateFn = (key: MessageKey, params?: Record<string, string | number>) => string;

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslateFn;
  dateLocale: string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const hasHydrated = useLocaleStore((s) => s.hasHydrated);
  const setHasHydrated = useLocaleStore((s) => s.setHasHydrated);

  useEffect(() => {
    // Ensure hydration flag is set even if persist callback already ran.
    if (!hasHydrated) {
      setHasHydrated(true);
    }
  }, [hasHydrated, setHasHydrated]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key, params) => translate(locale, key, params),
      dateLocale: locale === 'en' ? 'en-US' : 'fr-FR',
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useI18n must be used within LocaleProvider');
  }
  return context;
}
