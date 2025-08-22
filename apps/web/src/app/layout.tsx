import './globals.css';
import type { ReactNode } from 'react';
import ToastMount from './ToastMount';
import { ThemeProvider } from '@ui/shared';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
          <ToastMount />
        </ThemeProvider>
      </body>
    </html>
  );
}
