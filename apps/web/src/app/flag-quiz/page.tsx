"use client";
/// Sprint 2 TODOs: highlight UX, Next Question button, session score wiring.

import React from "react";
import { HISTORY_KEY, addToHistory, type GameResult } from "@lib/shared";

type Option = { id: string; label: string };
type Q = { id: string; question: string; options: Option[]; correctId: string; imageUrl?: string };

export default function FlagQuizPage() {
  const [q, setQ] = React.useState<Q | null>(null);
  const [chosen, setChosen] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<"idle"|"loading"|"ready">("idle");
  const [phase, setPhase] = React.useState<"idle"|"question"|"summary">("idle");
  const [roundSize, setRoundSize] = React.useState<number>(() => {
    const url = new URL(location.href);
    const n = Number(url.searchParams.get("n") ?? 10);
    return Number.isFinite(n) && n > 0 ? n : 10;
  });
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [scoreCorrect, setScoreCorrect] = React.useState(0);
  const [scoreTotal, setScoreTotal] = React.useState(0);
  const [difficulty, setDifficulty] = React.useState<"easy"|"medium"|"hard">("easy");
  const firstOptionRef = React.useRef<HTMLButtonElement | null>(null);
  const [seedBase] = React.useState<number>(() => {
    const url = new URL(location.href);
    const s = url.searchParams.get("seed");
    return s ? Number(s) : Math.floor(Math.random() * 1e6);
  });
  function seedFor(i: number) { return seedBase + i; }
  const [history, setHistory] = React.useState<GameResult[]>([]);

  async function load(seed?: number) {
    setStatus("loading");
    setChosen(null);
    const url = new URL((process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000") + "/v1/quiz/flag");
    if (seed != null) url.searchParams.set("seed", String(seed));
    const optsMap = { easy: 4, medium: 6, hard: 8 } as const;
    url.searchParams.set("options", String(optsMap[difficulty]));
    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();
    setQ(data);
    setStatus("ready");
    // Focus first option for accessibility
    setTimeout(() => firstOptionRef.current?.focus(), 0);
  }

  React.useEffect(() => {
    setPhase("question");
    setQuestionIndex(0);
    load(seedFor(0));
  }, []);
  React.useEffect(() => {
    if (status === "ready" && q && !chosen) {
      firstOptionRef.current?.focus();
    }
  }, [status, q, chosen]);
  React.useEffect(() => {
    if (phase === "summary") {
      try {
        if (typeof window !== "undefined") {
          const existingRaw = localStorage.getItem(HISTORY_KEY);
          const existing = existingRaw ? (JSON.parse(existingRaw) as GameResult[]) : [];
          const entry: GameResult = {
            dateISO: new Date().toISOString(),
            questions: scoreTotal,
            correct: scoreCorrect,
            percent: Math.round((scoreCorrect / Math.max(1, scoreTotal)) * 100)
          };
          const next = addToHistory(existing, entry, 5);
          localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
          setHistory(next);
        }
      } catch {
        setHistory([]);
      }
    } else {
      // Refresh history on transitions away as well
      try {
        if (typeof window !== "undefined") {
          const raw = localStorage.getItem(HISTORY_KEY);
          setHistory(raw ? (JSON.parse(raw) as GameResult[]) : []);
        }
      } catch { setHistory([]); }
    }
  }, [phase, scoreCorrect, scoreTotal]);

  return (
    <main role="main" aria-label="Flag Quiz">
      <div className="fq-container">
      <h1>Flag Quiz</h1>
      <p style={{ marginTop: 0 }}>Single question demo (Sprint 1).</p>
      <p style={{ margin: "8px 0 16px" }}>Score: {scoreCorrect} / {scoreTotal} {/* Sprint 2: wire up */}</p>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button style={{ minHeight: 44, padding: "12px 14px" }} onClick={() => load()}>New Question</button>
        <button style={{ minHeight: 44, padding: "12px 14px" }} onClick={() => load(123)}>Deterministic (seed=123)</button>
        <label style={{ marginLeft: 8 }}>Questions:
          <select value={roundSize} onChange={e => setRoundSize(Number(e.target.value))}>
            {[3,5,10].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
        {/* Sprint 4 STUB: difficulty selector (no functional change yet) */}
        <label>Difficulty:
          <select aria-label="Difficulty" value={difficulty} onChange={e => setDifficulty(e.target.value as any)}>
            <option value="easy">Easy (4)</option>
            <option value="medium">Medium (6)</option>
            <option value="hard">Hard (8)</option>
          </select>
        </label>
        {/* Sprint 4 STUB: start round (no new behaviour yet) */}
        <button type="button" aria-label="Start Round (stub)" style={{ minHeight: 44, padding: "12px 14px" }}>Start Round</button>
      </div>

      {status === "loading" && <p>Loading…</p>}

      {phase === "summary" ? (
        <section aria-label="Round summary" style={{ marginTop: 16 }}>
          <h1 data-testid="summary-heading">Round complete</h1>
          <p data-testid="summary-score">
            Score: {scoreCorrect} / {scoreTotal} ({Math.round((scoreCorrect / Math.max(1, scoreTotal)) * 100)}%)
          </p>
          <h3>Recent games</h3>
          <ul aria-label="Recent games">
            {history.length === 0 ? (
              <li>None yet</li>
            ) : (
              history.map((g, i) => (
                <li key={i}>
                  {new Date(g.dateISO).toLocaleString()} — {g.correct}/{g.questions} ({g.percent}%)
                </li>
              ))
            )}
          </ul>
          <button aria-label="Play Again" onClick={() => {
            setScoreCorrect(0); setScoreTotal(0); setQuestionIndex(0); setChosen(null);
            setPhase("question"); load(seedFor(0));
          }} data-testid="restart">Play Again</button>
        </section>
      ) : (
        q && (
          <section aria-label="Flag quiz question" style={{ marginTop: 16 }}>
            {q?.imageUrl && (
              <img
                src={q.imageUrl}
                alt={`Flag for ${q?.id ?? "current question"}`}
                loading="lazy"
                style={{ maxWidth: 320, height: "auto", display: "block", marginBottom: 12 }}
              />
            )}
            <h2 style={{ marginBottom: 8 }}>{q.question}</h2>
            <ul aria-label="Answer options" style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
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
                      aria-pressed={chosen === opt.id}
                      style={{
                        padding: "12px 14px",
                        border: "1px solid #ccc",
                        width: "100%",
                        minHeight: 44,
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
            {phase === "question" && questionIndex < roundSize - 1 && (
              <button aria-label="Next Question" style={{ minHeight: 44, padding: "12px 14px" }} onClick={() => { const next = questionIndex + 1; setQuestionIndex(next); setChosen(null); load(seedFor(next)); }} data-testid="next">Next Question</button>
            )}
            {phase === "question" && questionIndex === roundSize - 1 && (
              <button aria-label="Finish Round" style={{ minHeight: 44, padding: "12px 14px" }} onClick={() => { setPhase("summary"); }} data-testid="finish">Finish Round</button>
            )}
          </section>
        )
      )}

      {/* Sprint 4 STUB: summary placeholder (will replace/enhance in implementation) */}
      <section aria-label="Round summary (stub)" hidden>
        <h2>Round complete (stub)</h2>
        <p>Score: 0 / 0 (0%)</p>
        <h3>Recent games (stub)</h3>
        <ul>
          <li>—</li>
        </ul>
        <button type="button" aria-label="Play Again (stub)">Play Again</button>
      </section>
      </div>
    </main>
  );
}
