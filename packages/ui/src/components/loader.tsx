import { Loader2 } from 'lucide-react';

import { cn } from '../lib/utils';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeMap = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };

export function Loader({ size = 'md', label = 'Chargement...', className, ...props }: LoaderProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      <Loader2 className={cn('text-primary animate-spin', sizeMap[size])} />
      <span className="sr-only">{label}</span>
    </div>
  );
}
