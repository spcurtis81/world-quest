import React from "react";
import type { Metadata } from "next";
import { HeaderBar, ActivityPane, ToastProvider } from "@ui/shared";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Quest",
  description: "Learn the world through quick games",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <HeaderBar />
        <main data-testid="app-shell" className="container mx-auto px-4 py-8">
          <ActivityPane>
            {children}
          </ActivityPane>
        </main>
        <ToastProvider />
      </body>
    </html>
  );
}
