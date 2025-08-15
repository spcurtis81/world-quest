export type GameResult = { dateISO: string; questions: number; correct: number; percent: number };
export const HISTORY_KEY = "wq-recent-games";

export function addToHistory(existing: GameResult[], entry: GameResult, max = 5): GameResult[] {
  const next = [entry, ...existing].slice(0, max);
  return next;
}
