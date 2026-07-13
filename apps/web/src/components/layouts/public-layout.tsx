import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

import { Button } from '@edumanager/ui';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="bg-background flex min-h-screen flex-col overflow-x-hidden">
      <header className="bg-background/80 border-border sticky top-0 z-50 border-b backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/landing"
            className="flex min-w-0 shrink-0 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="text-foreground truncate text-sm font-semibold tracking-tight">
              EduManager Pro
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-muted hover:text-foreground text-sm transition-colors"
            >
              Fonctionnalités
            </a>
            <a
              href="#pricing"
              className="text-muted hover:text-foreground text-sm transition-colors"
            >
              Tarifs
            </a>
            <a href="#faq" className="text-muted hover:text-foreground text-sm transition-colors">
              FAQ
            </a>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="ghost" size="sm" className="h-9" asChild>
              <Link href="/login">Connexion</Link>
            </Button>
            <Button size="sm" className="h-9" asChild>
              <Link href="/login">Commencer</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-border border-t">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-md">
                <GraduationCap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold">EduManager Pro</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} EduManager Pro. Tous droits réservés.
            </p>
            <div className="text-muted-foreground flex gap-6 text-sm">
              <span>Confidentialité</span>
              <span>Conditions</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
