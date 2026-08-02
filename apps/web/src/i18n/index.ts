import { en } from './locales/en';
import { fr, type Messages } from './locales/fr';

export type Locale = 'fr' | 'en';

export const LOCALES: Locale[] = ['fr', 'en'];
export const DEFAULT_LOCALE: Locale = 'fr';

export const messagesByLocale: Record<Locale, Messages> = {
  fr,
  en,
};

type NestedKeyOf<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? NestedKeyOf<T[K], Prefix extends '' ? K : `${Prefix}.${K}`>
        : Prefix extends ''
          ? K
          : `${Prefix}.${K}`;
    }[keyof T & string]
  : never;

export type MessageKey = NestedKeyOf<Messages>;

export function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LOCALE;
  }

  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language].filter(Boolean);

  for (const candidate of candidates) {
    const code = candidate.toLowerCase().split('-')[0];
    if (code === 'en') return 'en';
    if (code === 'fr') return 'fr';
  }

  return DEFAULT_LOCALE;
}

function getByPath(messages: Messages, path: string): string | undefined {
  const parts = path.split('.');
  let current: unknown = messages;

  for (const part of parts) {
    if (current == null || typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === 'string' ? current : undefined;
}

export function translate(
  locale: Locale,
  key: MessageKey,
  params?: Record<string, string | number>,
): string {
  const raw = getByPath(messagesByLocale[locale], key) ?? getByPath(messagesByLocale.fr, key) ?? key;

  if (!params) {
    return raw;
  }

  return Object.entries(params).reduce(
    (result, [name, value]) => result.replaceAll(`{${name}}`, String(value)),
    raw,
  );
}

export type { Messages };
