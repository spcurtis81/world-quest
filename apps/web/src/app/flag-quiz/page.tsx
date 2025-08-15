"use client";

import React from "react";

type Option = { id: string; label: string };
type Q = { id: string; question: string; options: Option[]; correctId: string };

export default function FlagQuizPage() {
  const [q, setQ] = React.useState<Q | null>(null);
  const [chosen, setChosen] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<"idle"|"loading"|"ready">("idle");

  async function load(seed?: number) {
    setStatus("loading");
    setChosen(null);
    const url = new URL((process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000") + "/v1/quiz/flag");
    if (seed != null) url.searchParams.set("seed", String(seed));
    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();
    setQ(data);
    setStatus("ready");
  }

  React.useEffect(() => { load(); }, []);

  return (
    <main style={{ padding: 24, maxWidth: 640 }}>
      <h1>Flag Quiz</h1>
      <p style={{ marginTop: 0 }}>Single question demo (Sprint 1).</p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => load()}>New Question</button>
        <button onClick={() => load(123)}>Deterministic (seed=123)</button>
      </div>

      {status === "loading" && <p>Loading…</p>}

      {q && (
        <section style={{ marginTop: 16 }}>
          <h2 style={{ marginBottom: 8 }}>{q.question}</h2>
          <p style={{ fontStyle: "italic", marginTop: 0 }}>(Pretend there is a flag image here)</p>
          <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
            {q.options.map(opt => {
              const isCorrect = chosen && opt.id === q.correctId;
              const isWrong = chosen === opt.id && opt.id !== q.correctId;
              return (
                <li key={opt.id}>
                  <button
                    onClick={() => setChosen(opt.id)}
                    disabled={!!chosen}
                    style={{
                      padding: "8px 12px",
                      border: "1px solid #ccc",
                      width: "100%",
                      textAlign: "left",
                      background: isCorrect ? "#d4edda" : isWrong ? "#f8d7da" : undefined
                    }}
                  >
                    {opt.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {chosen && (
            <p style={{ marginTop: 8 }}>
              {chosen === q.correctId ? "✅ Correct!" : "❌ Incorrect"}
            </p>
          )}
        </section>
      )}
    </main>
  );
}
