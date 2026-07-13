export function isRadixPortaledLayer(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(
    target.closest('[data-radix-select-content]') ||
      target.closest('[data-radix-select-viewport]') ||
      target.closest('[data-radix-popper-content-wrapper]') ||
      target.closest('[role="listbox"]') ||
      target.closest('[role="menu"]'),
  );
}

export function preventDialogDismissOnPortaledLayer(event: Event) {
  if (isRadixPortaledLayer(event.target)) {
    event.preventDefault();
  }
}
