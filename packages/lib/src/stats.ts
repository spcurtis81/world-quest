export type RegionId = "ALL"|"EU"|"AF"|"AS"|"AM"|"OC";
export type OptionsCount = 4|6|8;
export type RoundResultSummary = {
  finishedAt: string; // ISO
  region: RegionId;
  optionsCount: OptionsCount;
  mode: "finite"|"infinite";
  n?: number; // for finite
  correct: number;
  total: number;
};

export const STATS_KEY = "wq.stats.v1";

export function readStats(): RoundResultSummary[] {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed as RoundResultSummary[] : [];
  } catch {
    return [];
  }
}

export function saveStats(list: RoundResultSummary[]): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(STATS_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function pushStat(item: RoundResultSummary): void {
  const list = readStats();
  list.unshift(item);
  const capped = list.slice(0, 50);
  saveStats(capped);
}
