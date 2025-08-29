import FlagQuizClient from "./FlagQuizClient";
import { GlassPanel, HeaderBar } from "@ui/shared";

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

  return (
    <GlassPanel className="max-w-3xl mx-auto">
      <HeaderBar title="Flag Quiz" />
      <div style={{ paddingTop: 8 }}>
        <a href="/launch" aria-label="Back to launcher" data-testid="back-to-launch">← All games</a>
      </div>
      <FlagQuizClient initialRoundSize={initialRoundSize} initialSeed={initialSeed ?? undefined} />
    </GlassPanel>
  );
}
