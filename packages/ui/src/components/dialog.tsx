'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '../lib/utils';
import { preventDialogDismissOnPortaledLayer } from '../lib/radix-portal';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

function useDocumentBodyPortal() {
  const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  return portalContainer;
}

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'absolute inset-0 z-[var(--z-dialog-overlay)] bg-black/45 backdrop-blur-[2px]',
      'data-[state=open]:animate-dialog-overlay-in data-[state=closed]:animate-dialog-overlay-out',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  showCloseButton?: boolean;
}

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, showCloseButton = true, onPointerDownOutside, onInteractOutside, ...props }, ref) => {
  const portalContainer = useDocumentBodyPortal();

  if (!portalContainer) {
    return null;
  }

  return (
    <DialogPrimitive.Portal container={portalContainer}>
      <div
        className="pointer-events-none fixed inset-0 z-[var(--z-dialog-overlay)]"
        aria-hidden={false}
      >
        <DialogOverlay className="pointer-events-auto" />

        <div className="pointer-events-none fixed inset-0 z-[var(--z-dialog-overlay)] flex items-center justify-center p-4 sm:p-6">
          <DialogPrimitive.Content
            ref={ref}
            className={cn(
              'bg-surface text-foreground border-border/80 pointer-events-auto relative z-[var(--z-dialog-content)] grid w-full max-w-lg gap-4 rounded-2xl border p-6 shadow-[var(--shadow-lg)] outline-none',
              'max-h-[min(90vh,calc(100dvh-2rem))] overflow-hidden',
              'data-[state=open]:animate-dialog-content-in data-[state=closed]:animate-dialog-content-out',
              'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              className,
            )}
            onPointerDownOutside={(event) => {
              preventDialogDismissOnPortaledLayer(event);
              onPointerDownOutside?.(event);
            }}
            onInteractOutside={(event) => {
              preventDialogDismissOnPortaledLayer(event);
              onInteractOutside?.(event);
            }}
            {...props}
          >
            {children}
            {showCloseButton ? (
              <DialogPrimitive.Close className="ring-offset-background focus:ring-ring bg-background-subtle/80 text-muted-foreground hover:bg-surface-hover hover:text-foreground absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full opacity-80 transition-all duration-150 hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none active:scale-95 disabled:pointer-events-none">
                <X className="h-4 w-4" />
                <span className="sr-only">Fermer</span>
              </DialogPrimitive.Close>
            ) : null}
          </DialogPrimitive.Content>
        </div>
      </div>
    </DialogPrimitive.Portal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogPortal = DialogPrimitive.Portal;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 pr-8 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg leading-none font-semibold tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-muted text-sm', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
