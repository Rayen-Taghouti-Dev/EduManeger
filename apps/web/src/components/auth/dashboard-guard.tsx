'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Loader } from '@edumanager/ui';

import { useAuth } from '@/providers/auth-provider';

export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useAuth();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [router, status]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader label="Chargement de la session..." />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return <>{children}</>;
}
