"use client";
import './globals.css';
import type { ReactNode } from 'react';
import { ToastProvider } from '@ui/shared';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
