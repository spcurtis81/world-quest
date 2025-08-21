"use client";
import * as React from "react";

export type ToastVariant = "info" | "success" | "error";
export type ToastOptions = { variant?: ToastVariant; durationMs?: number; id?: string };

type ToastEvent = { id: number; msg: string; variant: ToastVariant; durationMs: number };
type Listener = (e: ToastEvent) => void;

const listeners = new Set<Listener>();
const pending: ToastEvent[] = [];
function emit(e: ToastEvent) {
  if (listeners.size === 0) {
    // buffer until provider mounts
    pending.push(e);
    return;
  }
  listeners.forEach(l => l(e));
}

/** Global imperative API; safe no-op until provider is mounted */
export function toast(msg: string, opts: ToastOptions = {}) {
  const ev: ToastEvent = {
    id: Date.now() + Math.random(),
    msg,
    variant: opts.variant ?? "info",
    durationMs: Math.max(1000, opts.durationMs ?? 3500),
  };
  emit(ev);
}

type ToastContextValue = { push: (msg: string, opts?: ToastOptions) => void };
const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) return { push: (msg: string, opts?: ToastOptions) => toast(msg, opts) };
  return ctx;
}

export function ToastProvider() {
  const [items, setItems] = React.useState<ToastEvent[]>([]);

  React.useEffect(() => {
    const on: Listener = (e) => {
      setItems((curr) => [...curr, e]);
      window.setTimeout(() => setItems((curr) => curr.filter(t => t.id !== e.id)), e.durationMs);
    };
    listeners.add(on);
    // drain any buffered events synchronously on mount
    if (pending.length) {
      const copy = pending.splice(0, pending.length);
      copy.forEach(on);
    }
    return () => { listeners.delete(on); };
  }, []);

  const value: ToastContextValue = React.useMemo(() => ({
    push: (msg, opts) => toast(msg, opts),
  }), []);

  return (
    <ToastContext.Provider value={value}>
      <div id="toast-root" aria-live="polite">
        {items.map(t => (
          <div key={t.id} className={`toast ${t.variant}`} role="status">
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
