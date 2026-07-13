'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { Alert, AlertDescription } from '@edumanager/ui';

type ToastVariant = 'success' | 'error';

interface ToastState {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, variant: ToastVariant) => {
    const id = Date.now();
    setToast({ id, message, variant });

    window.setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 4000);
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({
      success: (message) => showToast(message, 'success'),
      error: (message) => showToast(message, 'error'),
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <div className="pointer-events-none fixed top-4 right-4 z-[var(--z-toast)] w-full max-w-sm">
          <Alert variant={toast.variant === 'success' ? 'success' : 'danger'}>
            <AlertDescription>{toast.message}</AlertDescription>
          </Alert>
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
}
