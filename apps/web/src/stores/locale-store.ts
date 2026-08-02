'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { DEFAULT_LOCALE, type Locale } from '@/i18n';

interface LocaleStore {
  locale: Locale;
  hasHydrated: boolean;
  setLocale: (locale: Locale) => void;
  setHasHydrated: (value: boolean) => void;
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: DEFAULT_LOCALE,
      hasHydrated: false,
      setLocale: (locale) => set({ locale }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: 'edumanager-locale',
      partialize: (state) => ({ locale: state.locale }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
