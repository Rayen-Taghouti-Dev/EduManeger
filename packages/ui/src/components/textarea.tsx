import * as React from 'react';

import { cn } from '../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        'border-input bg-surface ring-offset-background placeholder:text-muted-foreground flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';

export { Textarea };
