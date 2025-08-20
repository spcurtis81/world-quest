"use client";
import * as React from "react";
import { readStats, type RoundResultSummary } from "@lib/shared";

export default function StatsClient() {
  const [items, setItems] = React.useState<RoundResultSummary[]>([]);
  React.useEffect(() => {
    setItems(readStats());
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Stats</h1>
      {items.length === 0 ? (
        <p>No games yet.</p>
      ) : (
        <table data-testid="stats-table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th align="left">Date</th>
              <th align="left">Mode</th>
              <th align="left">Region</th>
              <th align="left">Options</th>
              <th align="left">Score</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r, i) => (
              <tr key={i}>
                <td>{new Date(r.finishedAt).toLocaleString()}</td>
                <td>{r.mode === "infinite" ? "∞" : `N=${r.n ?? "-"}`}</td>
                <td>{r.region}</td>
                <td>{r.optionsCount}</td>
                <td>
                  {r.mode === "infinite"
                    ? `${r.correct} correct / ${r.total} attempted`
                    : `${r.correct} / ${r.n} (${Math.round((r.correct / Math.max(1, r.n ?? 1)) * 100)}%)`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
