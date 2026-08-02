'use client';

import Link from 'next/link';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';

import { LanguageSwitcher } from '@/components/language-switcher';
import { useI18n } from '@/providers/locale-provider';
import { Button, cn } from '@edumanager/ui';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const { t } = useI18n();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navLinks = [
    { href: '#features', label: t('public.features') },
    { href: '#pricing', label: t('public.pricing') },
    { href: '#faq', label: t('public.faq') },
  ];

  return (
    <div className="bg-background flex min-h-dvh flex-col overflow-x-hidden">
      <header className="bg-background/80 border-border sticky top-0 z-50 border-b backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href="/landing"
            className="flex min-w-0 shrink-0 items-center gap-2 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none"
          >
            <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="text-foreground truncate text-sm font-semibold tracking-tight">
              {t('common.appName')}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted hover:text-foreground text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <LanguageSwitcher compact className="sm:hidden" />
            <Button variant="ghost" size="sm" className="hidden h-9 md:inline-flex" asChild>
              <Link href="/login">{t('public.login')}</Link>
            </Button>
            <Button size="sm" className="hidden h-9 sm:inline-flex" asChild>
              <Link href="/login">{t('public.getStarted')}</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 md:hidden"
              aria-label={mobileNavOpen ? t('common.close') : t('nav.openMenu')}
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              {mobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div
          className={cn(
            'border-border overflow-hidden border-t transition-[max-height,opacity] duration-200 md:hidden',
            mobileNavOpen ? 'max-h-64 opacity-100' : 'max-h-0 border-t-0 opacity-0',
          )}
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:bg-surface-hover rounded-md px-3 py-2.5 text-sm font-medium"
                onClick={() => setMobileNavOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button className="mt-2 h-10 w-full sm:hidden" asChild>
              <Link href="/login" onClick={() => setMobileNavOpen(false)}>
                {t('public.getStarted')}
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-border border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="flex items-center gap-2">
              <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-md">
                <GraduationCap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold">{t('common.appName')}</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} {t('common.appName')}. {t('public.rights')}
            </p>
            <div className="text-muted-foreground flex flex-wrap justify-center gap-4 text-sm sm:gap-6">
              <span>{t('public.privacy')}</span>
              <span>{t('public.terms')}</span>
              <span>{t('public.contact')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
