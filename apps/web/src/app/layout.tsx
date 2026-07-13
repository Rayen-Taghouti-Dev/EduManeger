import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AppProviders } from '@/providers/app-providers';
import { ThemeScript } from '@/components/theme-script';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EduManager Pro',
  description: 'Plateforme SaaS pour écoles privées',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.variable} relative isolate font-sans antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
