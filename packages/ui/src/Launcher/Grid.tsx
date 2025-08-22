"use client";
import * as React from "react";

export function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="list"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "var(--space-lg, 24px)",
        alignItems: "stretch",
      }}
    >
      {children}
    </div>
  );
}
