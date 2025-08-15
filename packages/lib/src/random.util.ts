export function shuffle<T>(arr: T[], rng: () => number = Math.random): T[] {
  // Fisher–Yates shuffle (to be used in Sprint 4; currently unused in stub)
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function seededRng(seed: number): () => number {
  // Simple LCG seeded RNG (mirror of seededRandom in flags.data if needed)
  let s = seed % 2147483647; if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
