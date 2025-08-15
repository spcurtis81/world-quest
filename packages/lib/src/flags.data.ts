export type Country = { code: string; name: string };
export const COUNTRIES: Country[] = [
  { code: "GB", name: "United Kingdom" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "FI", name: "Finland" }
];

export function seededRandom(seed: number) {
  // simple LCG for determinism
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export function pickDistinct<T>(rand: () => number, arr: T[], count: number): T[] {
  const copy = [...arr];
  const picked: T[] = [];
  for (let i = 0; i < count && copy.length > 0; i++) {
    const idx = Math.floor(rand() * copy.length);
    picked.push(copy.splice(idx, 1)[0]);
  }
  return picked;
}
