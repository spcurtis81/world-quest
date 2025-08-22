"use client";
import * as React from "react";
import type { GameStatus } from "@lib/shared";

type Props = {
  title: string;
  description: string;
  href: string;
  status: GameStatus;
  testId?: string;
};

export function GameCard({ title, description, href, status, testId }: Props) {
  const isDisabled = status === "disabled";
  const isComing = status === "coming_soon";
  const Tag: any = isDisabled ? "button" : "a";
  const commonProps: any = isDisabled
    ? { disabled: true, "aria-disabled": "true", title: "Temporarily unavailable" }
    : { href };
  return (
    <article role="article" aria-describedby={testId ? `${testId}-desc` : undefined} style={{ background: "var(--color-card)", color: "var(--color-text)", borderRadius: "var(--radius-lg, 12px)", padding: "var(--space-lg, 24px)", boxShadow: "var(--shadow-md)", display: "flex", flexDirection: "column", gap: "var(--space-sm, 10px)" }}>
      <h3 style={{ margin: 0 }}>{title} {isComing && <span style={{ marginLeft: 8, fontSize: 12, color: "var(--color-subtext)" }}>Coming soon</span>}</h3>
      <p id={testId ? `${testId}-desc` : undefined} style={{ margin: 0, color: "var(--color-subtext)" }}>{description}</p>
      <Tag data-testid={testId} {...commonProps} style={{ marginTop: "auto", padding: "10px 12px", borderRadius: 8, background: "var(--color-brand)", color: "#fff", border: 0, textDecoration: "none", textAlign: "center" }}>
        {isDisabled ? "Unavailable" : "Play"}
      </Tag>
    </article>
  );
}
