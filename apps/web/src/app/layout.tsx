import React from "react";
import type { Metadata } from "next";
import { AppShell, ToastProvider } from "@ui/shared";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Quest",
  description: "Learn the world through quick games",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>
          {children}
        </AppShell>
        <ToastProvider />
      </body>
    </html>
  );
}
