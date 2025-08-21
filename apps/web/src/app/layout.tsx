import './globals.css';
import type { ReactNode } from 'react';
import ToastMount from './ToastMount';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastMount />
      </body>
    </html>
  );
}
