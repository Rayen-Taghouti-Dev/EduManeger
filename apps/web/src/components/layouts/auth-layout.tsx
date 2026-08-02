'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';

import { LanguageSwitcher } from '@/components/language-switcher';
import { useI18n } from '@/providers/locale-provider';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Typography,
} from '@edumanager/ui';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useI18n();

  return (
    <div className="bg-background flex min-h-dvh">
      <div className="bg-primary hidden flex-1 flex-col justify-between p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
            <BookOpen className="h-5 w-5" />
          </div>
          <Typography variant="h4" className="text-white">
            {t('common.appName')}
          </Typography>
        </div>
        <div>
          <Typography variant="h2" className="mb-4 text-white">
            {t('auth.panelTitle')}
          </Typography>
          <Typography variant="body" className="max-w-md text-white/80">
            {t('auth.panelBody')}
          </Typography>
        </div>
        <Typography variant="caption" className="text-white/60">
          {t('auth.panelFooter')}
        </Typography>
      </div>

      <div className="relative flex flex-1 flex-col px-4 py-6 sm:px-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted hover:text-foreground h-9 gap-2"
            asChild
          >
            <Link href="/landing">
              <ArrowLeft className="h-4 w-4" />
              {t('common.back')}
            </Link>
          </Button>
          <LanguageSwitcher />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>{t('auth.welcomeBack')}</CardTitle>
              <CardDescription>{t('auth.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
