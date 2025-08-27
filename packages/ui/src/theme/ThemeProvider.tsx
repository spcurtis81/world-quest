"use client";
import * as React from "react";
import { tokens } from "./tokens";

function applyTokens(root: HTMLElement) {
  root.style.setProperty("--color-bg", tokens.colors.bg);
  root.style.setProperty("--color-card", tokens.colors.card);
  root.style.setProperty("--color-text", tokens.colors.text);
  root.style.setProperty("--color-subtext", tokens.colors.subtext);
  root.style.setProperty("--color-brand", tokens.colors.brand);
  root.style.setProperty("--color-brand-muted", tokens.colors.brandMuted);
  root.style.setProperty("--color-success", tokens.colors.success);
  root.style.setProperty("--color-warning", tokens.colors.warning);
  root.style.setProperty("--color-danger", tokens.colors.danger);
  root.style.setProperty("--radius-sm", `${tokens.radii.sm}px`);
  root.style.setProperty("--radius-md", `${tokens.radii.md}px`);
  root.style.setProperty("--radius-lg", `${tokens.radii.lg}px`);
  root.style.setProperty("--space-xs", `${tokens.spacing.xs}px`);
  root.style.setProperty("--space-sm", `${tokens.spacing.sm}px`);
  root.style.setProperty("--space-md", `${tokens.spacing.md}px`);
  root.style.setProperty("--space-lg", `${tokens.spacing.lg}px`);
  root.style.setProperty("--space-xl", `${tokens.spacing.xl}px`);
  root.style.setProperty("--shadow-md", tokens.shadow);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      applyTokens(document.documentElement);
    }
  }, []);
  return <>{children}</>;
}
