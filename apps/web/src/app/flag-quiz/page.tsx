"use client";
/// Sprint 2 TODOs: highlight UX, Next Question button, session score wiring.

import React from "react";

type Option = { id: string; label: string };
type Q = { id: string; question: string; options: Option[]; correctId: string; imageUrl?: string };

export default function FlagQuizPage() {
  const [q, setQ] = React.useState<Q | null>(null);
  const [chosen, setChosen] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<"idle"|"loading"|"ready">("idle");
  const [scoreCorrect, setScoreCorrect] = React.useState(0);
  const [scoreTotal, setScoreTotal] = React.useState(0);
  const firstOptionRef = React.useRef<HTMLButtonElement | null>(null);

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
  React.useEffect(() => {
    if (status === "ready" && q && !chosen) {
      firstOptionRef.current?.focus();
    }
  }, [status, q, chosen]);

  return (
    <main style={{ padding: 24, maxWidth: 640 }}>
      <h1>Flag Quiz</h1>
      <p style={{ marginTop: 0 }}>Single question demo (Sprint 1).</p>
      <p style={{ margin: "8px 0 16px" }}>Score: {scoreCorrect} / {scoreTotal} {/* Sprint 2: wire up */}</p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => load()}>New Question</button>
        <button onClick={() => load(123)}>Deterministic (seed=123)</button>
      </div>

      {status === "loading" && <p>Loading…</p>}

      {q && (
        <section aria-label="Flag quiz question" style={{ marginTop: 16 }}>
          {q?.imageUrl && (
            <img
              src={q.imageUrl}
              alt={q?.id ? `Flag of question ${q.id}` : "Flag for current question"}
              style={{ maxWidth: 320, height: "auto", display: "block", marginBottom: 12 }}
            />
          )}
          <h2 style={{ marginBottom: 8 }}>{q.question}</h2>
          <p style={{ fontStyle: "italic", marginTop: 0 }}>(Pretend there is a flag image here)</p>
          <ul aria-label="Answer options" style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
            {q.options.map((opt, idx) => {
              const isCorrect = chosen && opt.id === q.correctId;
              const isWrong = chosen === opt.id && opt.id !== q.correctId;
              return (
                <li key={opt.id}>
                  <button
                    ref={idx === 0 ? firstOptionRef : undefined}
                    onClick={() => {
                      if (!chosen) {
                        setChosen(opt.id);
                        setScoreTotal((n) => n + 1);
                        if (opt.id === q!.correctId) setScoreCorrect((n) => n + 1);
                      }
                    }}
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
            <>
              <p style={{ marginTop: 8 }}>
                {chosen === q.correctId ? "✅ Correct!" : "❌ Incorrect"}
              </p>
              {/* Sprint 2: add "Next Question" button here and adjust score on first click only */}
              <button onClick={() => load()} data-testid="next">Next Question</button>
            </>
          )}
        </section>
      )}
    </main>
  );
}
