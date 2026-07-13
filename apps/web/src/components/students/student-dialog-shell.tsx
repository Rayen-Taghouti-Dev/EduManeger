'use client';

import type { LucideIcon } from 'lucide-react';
import { X } from 'lucide-react';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  cn,
} from '@edumanager/ui';

interface StudentDialogShellProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon: LucideIcon;
  title: string;
  description: string;
  descriptionId: string;
  formId: string;
  cancelLabel?: string;
  submitLabel: string;
  isSubmitting?: boolean;
  onCancel: () => void;
  errorMessage?: string | null;
  children: React.ReactNode;
}

export function StudentDialogShell({
  open,
  onOpenChange,
  icon: Icon,
  title,
  description,
  descriptionId,
  formId,
  cancelLabel = 'Annuler',
  submitLabel,
  isSubmitting,
  onCancel,
  errorMessage,
  children,
}: StudentDialogShellProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          'flex max-h-[min(90vh,calc(100dvh-2rem))] w-full max-w-[960px] flex-col gap-0 overflow-hidden p-0',
          'rounded-2xl border-border/80 shadow-[var(--shadow-lg)]',
        )}
        aria-describedby={descriptionId}
      >
        <header className="border-border/70 bg-surface shrink-0 border-b px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <div className="bg-primary-light text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-[var(--shadow-sm)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 space-y-1 pr-2">
                <DialogTitle className="text-xl font-semibold tracking-tight">{title}</DialogTitle>
                <DialogDescription id={descriptionId} className="text-muted text-sm leading-relaxed">
                  {description}
                </DialogDescription>
              </div>
            </div>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-background-subtle hover:text-foreground h-9 w-9 shrink-0 rounded-full transition-all duration-150 active:scale-95"
                aria-label="Fermer la fenêtre"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </header>

        <div className="bg-background-subtle/30 min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          {children}
          {errorMessage ? (
            <p className="text-danger bg-danger-light/40 border-danger/20 mt-4 rounded-lg border px-4 py-3 text-sm" role="alert">
              {errorMessage}
            </p>
          ) : null}
        </div>

        <footer className="border-border/70 bg-surface shrink-0 border-t px-6 py-4 sm:px-8">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="h-10 min-w-[7.5rem] transition-all duration-150 active:scale-[0.98]"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {cancelLabel}
            </Button>
            <Button
              type="submit"
              form={formId}
              className="h-10 min-w-[7.5rem] transition-all duration-150 active:scale-[0.98]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enregistrement...' : submitLabel}
            </Button>
          </div>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
