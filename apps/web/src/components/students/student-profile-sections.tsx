import type { LucideIcon } from 'lucide-react';

import { cn } from '@edumanager/ui';

interface StudentInfoRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export function StudentInfoRow({ label, value, className }: StudentInfoRowProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 border-b border-border/70 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4',
        className,
      )}
    >
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-sm font-medium sm:text-right">{value}</span>
    </div>
  );
}

interface StudentSectionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function StudentSectionCard({
  title,
  description,
  icon: Icon,
  children,
  className,
}: StudentSectionCardProps) {
  return (
    <section className={cn('widget-card overflow-hidden', className)}>
      <div className="border-border flex items-start gap-3 border-b px-6 py-5">
        <div className="bg-primary-light text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      <div className="px-6 py-2">{children}</div>
    </section>
  );
}
