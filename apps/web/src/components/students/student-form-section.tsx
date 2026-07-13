import type { LucideIcon } from 'lucide-react';

import { cn } from '@edumanager/ui';

interface StudentFormSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function StudentFormSection({
  icon: Icon,
  title,
  description,
  children,
  className,
}: StudentFormSectionProps) {
  return (
    <section
      className={cn(
        'bg-background-subtle/40 border-border/70 overflow-hidden rounded-xl border shadow-[var(--shadow-sm)]',
        className,
      )}
    >
      <div className="border-border/60 flex items-start gap-3 border-b px-5 py-4">
        <div className="bg-primary-light text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="min-w-0 space-y-0.5">
          <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
          <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

interface StudentFormFieldProps {
  label: string;
  htmlFor: string;
  helper?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function StudentFormField({
  label,
  htmlFor,
  helper,
  error,
  children,
  className,
}: StudentFormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={htmlFor} className="text-foreground block text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-danger text-xs" role="alert">
          {error}
        </p>
      ) : helper ? (
        <p className="text-muted-foreground text-xs">{helper}</p>
      ) : null}
    </div>
  );
}

export const studentFormControlClassName =
  'h-10 w-full transition-colors duration-150 hover:border-border-hover';

export const studentFormSelectTriggerClassName =
  'h-10 w-full transition-colors duration-150 hover:border-border-hover';
