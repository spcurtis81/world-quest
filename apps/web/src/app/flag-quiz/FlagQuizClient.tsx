"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { HISTORY_KEY, addToHistory, type GameResult, pushStat, type RoundResultSummary } from "@lib/shared";
import { toast } from "@ui/shared";

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
  const [appliedRegion, setAppliedRegion] = React.useState<"ALL"|"EU"|"AF"|"AS"|"AM"|"OC">("ALL");
  const currentFetchIdRef = React.useRef(0);
  // Sprint 7 stubs (unused until implementation)
  const [isRegionModalOpen, setIsRegionModalOpen] = React.useState(false);
  const [pendingRegion, setPendingRegion] = React.useState<"ALL"|"EU"|"AF"|"AS"|"AM"|"OC">("ALL");
  const [isInfinite, setIsInfinite] = React.useState(false);
  const firstOptionRef = React.useRef<HTMLButtonElement | null>(null);
  const regionSelectRef = React.useRef<HTMLSelectElement | null>(null);
  const prevFocusRef = React.useRef<HTMLElement | null>(null);
  const modalCancelRef = React.useRef<HTMLButtonElement | null>(null);
  const modalConfirmRef = React.useRef<HTMLButtonElement | null>(null);
  const [seedBase] = React.useState<number>(() => (initialSeed ?? Math.floor(Math.random() * 1e6)));
  function seedFor(i: number) { return seedBase + i; }
  const [history, setHistory] = React.useState<GameResult[]>([]);
  const [roundResults, setRoundResults] = React.useState<Array<{ code: string; correctLabel: string; chosenId: string | null; isCorrect: boolean; imageUrl?: string }>>([]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = (e.currentTarget.value as "ALL"|"EU"|"AF"|"AS"|"AM"|"OC");
    if (phase === "question" && newValue !== appliedRegion) {
      setPendingRegion(newValue);
      setIsRegionModalOpen(true);
    } else {
      setAppliedRegion(newValue);
      if (phase !== "question") {
        beginRound(0, undefined, newValue);
      }
    }
  };

  const beginRound = React.useCallback((indexToLoad?: number, overrideSeed?: number, regionOverride?: string) => {
    // Reset round state
    setScoreCorrect(0);
    setScoreTotal(0);
    setQuestionIndex(0);
    setChosen(null);
    setRoundResults([]);
    setPhase("question");
    setQ(null);
    
    // Load first question
    load(indexToLoad, overrideSeed, regionOverride);
    
    // Emit deterministic toast with stable ID
    toast("New round started", { id: "round-started" });
  }, [load]);

  async function load(indexToLoad?: number, overrideSeed?: number, regionOverride?: string) {
    const fetchId = ++currentFetchIdRef.current;
    setStatus("loading");
    setChosen(null);
    const url = new URL((process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000") + "/v1/quiz/flag");
    const idx = typeof indexToLoad === "number" ? indexToLoad : questionIndex;
    const seedVal = typeof overrideSeed === "number" ? overrideSeed : seedBase;
    url.searchParams.set("seed", String(seedVal));
    url.searchParams.set("index", String(idx));
    const optsMap = { easy: 4, medium: 6, hard: 8 } as const;
    url.searchParams.set("options", String(optsMap[difficulty]));
    url.searchParams.set("region", String(regionOverride ?? appliedRegion));
    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();

    if (fetchId === currentFetchIdRef.current) {
      setQ(data);
      setStatus("ready");
      setTimeout(() => firstOptionRef.current?.focus(), 0);
    }
  }

  const mountedRef = React.useRef(false);
  React.useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    beginRound(0, seedFor(0));
  }, [beginRound]);
  // Persist region in-session
  React.useEffect(() => { try { if (typeof window !== "undefined") sessionStorage.setItem("region", appliedRegion); } catch {} }, [appliedRegion]);
  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = sessionStorage.getItem("region") as any;
        if (saved) setAppliedRegion(saved);
      }
    } catch {}
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

          // Stats: push summary
          const optsMap = { easy: 4, medium: 6, hard: 8 } as const;
          const optionsCount = optsMap[difficulty];
          const stat: RoundResultSummary = {
            finishedAt: new Date().toISOString(),
            region: appliedRegion,
            optionsCount,
            mode: isInfinite ? "infinite" : "finite",
            n: isInfinite ? undefined : roundSize,
            correct: scoreCorrect,
            total: scoreTotal,
          };
          pushStat(stat);
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
  }, [phase, scoreCorrect, scoreTotal, appliedRegion, isInfinite, roundSize, difficulty]);

  React.useEffect(() => {
    const shell = document.querySelector<HTMLElement>('main[data-testid="app-shell"]');
    if (!shell) return;
    if (isRegionModalOpen) {
      shell.setAttribute("inert", "");
      shell.setAttribute("aria-hidden", "true");
    } else {
      shell.removeAttribute("inert");
      shell.removeAttribute("aria-hidden");
    }
    return () => {
      shell.removeAttribute("inert");
      shell.removeAttribute("aria-hidden");
    };
  }, [isRegionModalOpen]);

  return (
    <section role="region" aria-label="Flag Quiz" data-region={appliedRegion}>
      <div
        className="fq-container"
      >
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
        {/* Sprint 7 STUB: Infinite round */}
        <label>Round length:&nbsp;
          <select
            aria-label="Round length"
            value={isInfinite ? "INF" : String(roundSize)}
            onChange={(e) => {
              const v = e.currentTarget.value;
              if (v === "INF") {
                setIsInfinite(true);
              } else {
                setIsInfinite(false);
                setRoundSize(Number(v));
              }
              if (phase !== "question") {
                setQuestionIndex(0);
                setChosen(null);
                load(0, undefined, appliedRegion);
              }
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="INF">∞</option>
          </select>
        </label>
        {/* Sprint 7 STUB: Region */}
        <label>Region:&nbsp;
          <select aria-label="Region" data-testid="region-select" ref={regionSelectRef} value={appliedRegion} onChange={handleRegionChange}>
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
          {isInfinite ? (
            <p data-testid="summary-score">Stats so far: {scoreCorrect} correct / {scoreTotal} attempted</p>
          ) : (
            <p data-testid="summary-score">Score: {scoreCorrect} / {scoreTotal} ({Math.round((scoreCorrect / Math.max(1, scoreTotal)) * 100)}%)</p>
          )}
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
          <a href="/stats" data-testid="go-stats" style={{ marginRight: 8 }}>View stats</a>
          <button aria-label="Play Again" onClick={() => {
            beginRound(0);
          }} data-testid="restart">Play Again</button>
        </section>
      ) : (
        q && (
          <section aria-label="Flag quiz question" style={{ marginTop: 16 }}>
            <div style={{ fontSize: 14, color: "#555", marginBottom: 8 }}>
              {isInfinite ? `Question ${questionIndex + 1}` : `Question ${questionIndex + 1} of ${roundSize}`}
            </div>
            {q?.imageUrl && (
              <img
                data-testid="flag-image"
                data-code={q.correctId}
                src={q.imageUrl}
                alt={`Flag of ${q.correctId} (${q.correctId})`}
                loading="lazy"
                style={{ maxWidth: 320, height: "auto", display: "block", marginBottom: 12 }}
              />
            )}
            <h2 style={{ marginBottom: 8 }}>{q.question}</h2>
            <ul className="quiz-options" aria-label="Answer options" style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
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

            <p className="fq-feedback" data-testid="feedback" style={{ marginTop: 8 }}>
              {chosen ? (chosen === q.correctId ? "Correct!" : "Incorrect") : ""}
            </p>
            {phase === "question" && (isInfinite || questionIndex < roundSize - 1) && (
              <button aria-label="Next Question" style={{ minHeight: 44, padding: "12px 14px" }} onClick={() => { const next = questionIndex + 1; setQuestionIndex(next); setChosen(null); load(next); }} data-testid="next">Next Question</button>
            )}
            {phase === "question" && !isInfinite && questionIndex === roundSize - 1 && (
              <button aria-label="Finish Round" style={{ minHeight: 44, padding: "12px 14px" }} onClick={() => { setPhase("summary"); }} data-testid="finish">Finish Round</button>
            )}
            {phase === "question" && isInfinite && (
              <button data-testid="end-round" onClick={() => setPhase("summary")} style={{ minHeight: 36, padding: "8px 12px", marginLeft: 8 }}>End round</button>
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
      {/* Region-change overlay modal rendered via portal to <body> */}
      {isRegionModalOpen && (
        <ModalPortal>
          <div
            data-testid="modal-backdrop"
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.35)', zIndex: 10000 }}
            aria-hidden="true"
          />
          <dialog
            data-testid="region-change-modal"
            open
            aria-modal="true"
            role="dialog"
            aria-labelledby="region-modal-title"
            style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10001, border: 'none', borderRadius: 8, padding: 16, maxWidth: 420, width: 'calc(100% - 2rem)' }}
            onKeyDown={(ev) => {
              if (ev.key === 'Escape') {
                ev.preventDefault();
                ev.stopPropagation();
                setIsRegionModalOpen(false);
                setPendingRegion(appliedRegion);
                document.querySelector<HTMLSelectElement>('[data-testid="region-select"]')?.focus();
              }
            }}
          >
            <h2 id="region-modal-title" style={{ marginTop: 0 }}>Change region?</h2>
            <p>Changing region will abandon the current round and start a new one. Continue?</p>
            <div className="region-modal-actions">
              <button
                type="button"
                data-testid="region-modal-cancel"
                className="btn secondary"
                onClick={() => {
                  setIsRegionModalOpen(false);
                  setPendingRegion(appliedRegion);
                  document.querySelector<HTMLSelectElement>('[data-testid="region-select"]')?.focus();
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                data-testid="region-modal-confirm"
                autoFocus
                className="btn primary"
                onClick={() => {
                  const applied = pendingRegion ?? appliedRegion;
                  setIsRegionModalOpen(false);
                  setAppliedRegion(applied);
                  setQ(null);
                  // restart round
                  beginRound(0, undefined, applied);
                  setTimeout(() => {
                    document.querySelector<HTMLButtonElement>('main ul [role="button"]')?.focus();
                  }, 0);
                }}
              >
                Confirm
              </button>
            </div>
          </dialog>
        </ModalPortal>
      )}
      {/* Sprint 6 STUB: per-question summary */}
      <section aria-label="Round review (stub)" hidden>
        <h3>Review (stub)</h3>
        <ul>
          <li>Q1 — ✅ Switzerland</li>
          <li>Q2 — ❌ Germany</li>
        </ul>
      </section>
    </section>
  );
}

function ModalPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const target = document.body;
  return createPortal(children, target);
}