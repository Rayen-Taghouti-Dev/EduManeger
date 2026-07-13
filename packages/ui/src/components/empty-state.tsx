import { Inbox } from 'lucide-react';
import * as React from 'react';

import { cn } from '../lib/utils';
import { Typography } from './typography';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center',
        className,
      )}
      {...props}
    >
      <div className="bg-primary-light text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full">
        {icon ?? <Inbox className="h-6 w-6" />}
      </div>
      <Typography variant="h4" className="mb-2">
        {title}
      </Typography>
      {description && (
        <Typography variant="muted" className="mb-4 max-w-sm">
          {description}
        </Typography>
      )}
      {action}
    </div>
  );
}
