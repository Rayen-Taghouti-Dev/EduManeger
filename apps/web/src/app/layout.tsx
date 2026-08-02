import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AppProviders } from '@/providers/app-providers';
import { LocaleScript } from '@/components/locale-script';
import { ThemeScript } from '@/components/theme-script';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EduManager Pro',
  description: 'Private school SaaS platform / Plateforme SaaS pour écoles privées',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <LocaleScript />
      </head>
      <body className={`${inter.variable} relative isolate font-sans antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
