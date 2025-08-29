'use client';
import * as React from 'react';

// A tiny clsx-like utility
function mergeClasses(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export interface AppShellProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

function AppShell({ header, footer, className, children }: AppShellProps) {
  return (
    <div className="relative min-h-screen bg-app">
      <div className="absolute inset-0 -z-10 bg-app-overlay" aria-hidden="true"></div>
      {header ? <header className="app-header">{header}</header> : null}
      <main data-testid="app-shell" className={mergeClasses('container mx-auto px-4 py-8', className)}>
        {children}
      </main>
      {footer ? <footer className="app-footer">{footer}</footer> : null}
    </div>
  );
}

export { AppShell };
