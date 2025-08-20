"use client";
import * as React from "react";
import { HISTORY_KEY, addToHistory, type GameResult } from "@lib/shared";

type Option = { id: string; label: string };
type Q = { id: string; question: string; options: Option[]; correctId: string; imageUrl?: string };

type Props = {
  initialRoundSize: number;
  initialSeed?: number | null;
};

export default function FlagQuizClient({ initialRoundSize, initialSeed }: Props) {
  const [q, setQ] = React.useState<Q | null>(null);
  const [chosen, setChosen] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<"idle"|"loading"|"ready">("idle");
  const [phase, setPhase] = React.useState<"idle"|"question"|"summary">("idle");
  const [roundSize, setRoundSize] = React.useState<number>(initialRoundSize);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [scoreCorrect, setScoreCorrect] = React.useState(0);
  const [scoreTotal, setScoreTotal] = React.useState(0);
  const [difficulty, setDifficulty] = React.useState<"easy"|"medium"|"hard">("easy");
  const [region, setRegion] = React.useState<string>("ALL");
  const firstOptionRef = React.useRef<HTMLButtonElement | null>(null);
  const [seedBase] = React.useState<number>(() => (initialSeed ?? Math.floor(Math.random() * 1e6)));
  function seedFor(i: number) { return seedBase + i; }
  const [history, setHistory] = React.useState<GameResult[]>([]);
  const [roundResults, setRoundResults] = React.useState<Array<{ code: string; correctLabel: string; chosenId: string | null; isCorrect: boolean; imageUrl?: string }>>([]);

  async function load(indexToLoad?: number, overrideSeed?: number) {
    setStatus("loading");
    setChosen(null);
    const url = new URL((process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000") + "/v1/quiz/flag");
    const idx = typeof indexToLoad === "number" ? indexToLoad : questionIndex;
    const seedVal = typeof overrideSeed === "number" ? overrideSeed : seedBase;
    url.searchParams.set("seed", String(seedVal));
    url.searchParams.set("index", String(idx));
    const optsMap = { easy: 4, medium: 6, hard: 8 } as const;
    url.searchParams.set("options", String(optsMap[difficulty]));
    url.searchParams.set("region", String(region));
    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();
    setQ(data);
    setStatus("ready");
    setTimeout(() => firstOptionRef.current?.focus(), 0);
  }

  React.useEffect(() => {
    setPhase("question");
    setQuestionIndex(0);
    load(seedFor(0));
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <p style={{ margin: "8px 0 16px" }}>Score: {scoreCorrect} / {scoreTotal}</p>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button style={{ minHeight: 44, padding: "12px 14px" }} onClick={() => load(0)}>New Question</button>
        <button style={{ minHeight: 44, padding: "12px 14px" }} onClick={() => load(questionIndex, 123)}>Deterministic (seed=123)</button>
        <label style={{ marginLeft: 8 }}>Questions:
          <select value={roundSize} onChange={e => setRoundSize(Number(e.target.value))}>
            {[3,5,10].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
        <label>Difficulty:
          <select aria-label="Difficulty" value={difficulty} onChange={e => setDifficulty(e.target.value as any)}>
            <option value="easy">Easy (4)</option>
            <option value="medium">Medium (6)</option>
            <option value="hard">Hard (8)</option>
          </select>
        </label>
        <button type="button" aria-label="Start Round (stub)" style={{ minHeight: 44, padding: "12px 14px" }}>Start Round</button>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8, flexWrap: "wrap" }}>
        {/* Sprint 6 STUB: round length */}
        <label>Round length:&nbsp;
          <select aria-label="Round length (stub)" value={String(roundSize)} onChange={e => setRoundSize(Number(e.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
        {/* Sprint 6 STUB: region filter */}
        <label>Region:&nbsp;
          <select aria-label="Region (stub)" value={region} onChange={e => setRegion(e.target.value)}>
            <option value="ALL">World</option>
            <option value="EU">Europe</option>
            <option value="AF">Africa</option>
            <option value="AS">Asia</option>
            <option value="AM">Americas</option>
            <option value="OC">Oceania</option>
          </select>
        </label>
      </div>

      {status === "loading" && <p>Loading…</p>}

      {phase === "summary" ? (
        <section aria-label="Round summary" style={{ marginTop: 16 }}>
          <h1 data-testid="summary-heading">Round complete</h1>
          <p data-testid="summary-score">
            Score: {scoreCorrect} / {scoreTotal} ({Math.round((scoreCorrect / Math.max(1, scoreTotal)) * 100)}%)
          </p>
          <ul aria-label="Round review">
            {roundResults.map((r, i) => (
              <li key={i}>
                {r.imageUrl && (
                  <img src={r.imageUrl} alt={`Flag ${r.code}`} loading="lazy" style={{ width: 64, height: "auto", marginRight: 8 }} />
                )}
                <span>{i + 1}.</span>{" "}
                <strong>{r.correctLabel}</strong>{" "}
                <span>{r.isCorrect ? "✅" : "❌"}</span>
              </li>
            ))}
          </ul>
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
            setRoundResults([]);
            setPhase("question"); load(0);
          }} data-testid="restart">Play Again</button>
        </section>
      ) : (
        q && (
          <section aria-label="Flag quiz question" style={{ marginTop: 16 }}>
            <div style={{ fontSize: 14, color: "#555", marginBottom: 8 }}>Question {questionIndex + 1} of {roundSize}</div>
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
                        if (!chosen && q) {
                          setChosen(opt.id);
                          setScoreTotal((n) => n + 1);
                          const isRight = opt.id === q.correctId;
                          if (isRight) setScoreCorrect((n) => n + 1);
                          const correctOption = q.options.find(o => o.id === q.correctId);
                          setRoundResults(prev => ([...prev, {
                            code: q.correctId,
                            correctLabel: correctOption ? correctOption.label : q.correctId,
                            chosenId: opt.id,
                            isCorrect: isRight,
                            imageUrl: q.imageUrl,
                          }]));
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
              <button aria-label="Next Question" style={{ minHeight: 44, padding: "12px 14px" }} onClick={() => { const next = questionIndex + 1; setQuestionIndex(next); setChosen(null); load(next); }} data-testid="next">Next Question</button>
            )}
            {phase === "question" && questionIndex === roundSize - 1 && (
              <button aria-label="Finish Round" style={{ minHeight: 44, padding: "12px 14px" }} onClick={() => { setPhase("summary"); }} data-testid="finish">Finish Round</button>
            )}
          </section>
        )
      )}

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
      {/* Sprint 6 STUB: per-question summary */}
      <section aria-label="Round review (stub)" hidden>
        <h3>Review (stub)</h3>
        <ul>
          <li>Q1 — ✅ Switzerland</li>
          <li>Q2 — ❌ Germany</li>
        </ul>
      </section>
    </main>
  );
}
