import * as React from "react";
import { createPortal } from "react-dom";
import "./toast.css";

export type ToastType = "info" | "success" | "error";
export type ToastOptions = { message: string; type?: ToastType; durationMs?: number };

type ToastInternal = ToastOptions & { id: number; type: ToastType };

const listeners = new Set<(toasts: ToastInternal[]) => void>();
let toasts: ToastInternal[] = [];
let idCounter = 1;

function emit() { for (const l of listeners) l(toasts); }

export function showToast(opts: ToastOptions) {
  const toast: ToastInternal = { id: idCounter++, type: opts.type ?? "info", message: opts.message, durationMs: opts.durationMs ?? 2500 };
  toasts = [...toasts, toast];
  emit();
  window.setTimeout(() => { dismissToast(toast.id); }, toast.durationMs);
}

export function dismissToast(id: number) {
  toasts = toasts.filter(t => t.id !== id);
  emit();
}

export function useToastState() {
  const [state, setState] = React.useState<ToastInternal[]>(toasts);
  React.useEffect(() => {
    const l = (t: ToastInternal[]) => setState(t);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return state;
}

export function ToastPortal() {
  const items = useToastState();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(
    <div className="toast-root" aria-live="polite" aria-atomic="true">
      {items.map(t => (
        <div key={t.id} className="toast-item" data-type={t.type} role="status">{t.message}</div>
      ))}
    </div>,
    document.body
  );
}
