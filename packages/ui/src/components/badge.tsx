import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-white',
        secondary: 'border-transparent bg-secondary-light text-secondary',
        success: 'border-transparent bg-success-light text-success',
        warning: 'border-transparent bg-warning-light text-warning',
        danger: 'border-transparent bg-danger-light text-danger',
        outline: 'text-foreground border-border bg-surface',
      },
      size: {
        default: 'min-h-6 px-3 py-1 text-xs leading-5',
        sm: 'min-h-5 px-2.5 py-0.5 text-[11px] leading-4',
        lg: 'min-h-7 px-3.5 py-1 text-sm leading-5',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
