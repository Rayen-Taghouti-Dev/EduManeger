import * as React from 'react';

import { cn } from '../lib/utils';

const typographyVariants = {
  h1: 'scroll-m-20 text-4xl font-bold tracking-tight text-foreground lg:text-5xl',
  h2: 'scroll-m-20 text-3xl font-semibold tracking-tight text-foreground',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight text-foreground',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight text-foreground',
  body: 'text-base leading-7 text-foreground',
  caption: 'text-sm text-muted',
  muted: 'text-sm text-muted-foreground',
} as const;

type TypographyVariant = keyof typeof typographyVariants;

const defaultElements: Record<TypographyVariant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body: 'p',
  caption: 'span',
  muted: 'p',
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
}

export function Typography({
  variant = 'body',
  as,
  className,
  children,
  ...props
}: TypographyProps) {
  const Component = as ?? defaultElements[variant];
  return (
    <Component className={cn(typographyVariants[variant], className)} {...props}>
      {children}
    </Component>
  );
}

export { typographyVariants };
