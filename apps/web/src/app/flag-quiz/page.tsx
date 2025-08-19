import FlagQuizClient from "./FlagQuizClient";

export default function Page({
  searchParams,
}: {
  searchParams: { n?: string; seed?: string };
}) {
  const nRaw = searchParams?.n ?? "10";
  const seedRaw = searchParams?.seed ?? undefined;
  const n = Number(nRaw);
  const initialRoundSize = Number.isFinite(n) && n > 0 ? n : 10;

  const s = seedRaw !== undefined ? Number(seedRaw) : null;
  const initialSeed = s !== null && Number.isFinite(s) ? s : null;

  return <FlagQuizClient initialRoundSize={initialRoundSize} initialSeed={initialSeed ?? undefined} />;
}
