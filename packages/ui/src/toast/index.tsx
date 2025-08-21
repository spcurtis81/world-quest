"use client";
import * as React from "react";

// Types
export type ToastVariant = "info" | "success" | "error";
export type ToastOptions = { variant?: ToastVariant; durationMs?: number; id?: string };

// Internal event bus (SSR-safe no-op until mounted)
type ToastEvent = { id: number; msg: string; variant: ToastVariant; durationMs: number };
type Listener = (e: ToastEvent) => void;
const listeners = new Set<Listener>();
function emit(e: ToastEvent) { listeners.forEach(l => l(e)); }

// Public imperative API — works anywhere once provider is mounted
export function toast(msg: string, opts: ToastOptions = {}) {
  // If no provider is mounted yet, queue is effectively dropped (no-ops). This is acceptable for transient UI.
  const ev: ToastEvent = {
    id: Date.now() + Math.random(),
    msg,
    variant: opts.variant ?? "info",
    durationMs: Math.max(1000, opts.durationMs ?? 3500),
  };
  emit(ev);
}

// Context + hook (for components that want fine control)
type ToastContextValue = {
  push: (msg: string, opts?: ToastOptions) => void;
};
const ToastContext = React.createContext<ToastContextValue | null>(null);
export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) { 
    // Return a safe no-op so components can call useToast() during SSR without throwing
    return { push: (msg: string, opts?: ToastOptions) => toast(msg, opts) };
  }
  return ctx;
}

// Provider renders the host in a portal-like fixed layer
export function ToastProvider() {
  const [items, setItems] = React.useState<Array<ToastEvent>>([]);

  React.useEffect(() => {
    const on = (e: ToastEvent) => {
      setItems(curr => [...curr, e]);
      window.setTimeout(() => {
        setItems(curr => curr.filter(t => t.id !== e.id));
      }, e.durationMs);
    };
    listeners.add(on);
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
