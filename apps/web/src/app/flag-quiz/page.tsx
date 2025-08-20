import FlagQuizClient from "./FlagQuizClient";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ n?: string; seed?: string }>;
}) {
  const sp = await searchParams;
  const nRaw = sp?.n ?? "10";
  const seedRaw = sp?.seed ?? undefined;
  const n = Number(nRaw);
  const initialRoundSize = Number.isFinite(n) && n > 0 ? n : 10;

  const s = seedRaw !== undefined ? Number(seedRaw) : null;
  const initialSeed = s !== null && Number.isFinite(s) ? s : null;

  return <FlagQuizClient initialRoundSize={initialRoundSize} initialSeed={initialSeed ?? undefined} />;
}
