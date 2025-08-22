import { GAMES, type GameMeta, type GameStatus } from "@lib/shared";
import { GameCard, Grid } from "@ui/shared";

function overlayStatuses(games: GameMeta[]): GameMeta[] {
  const raw = process.env.NEXT_PUBLIC_GAMES_STATUS;
  if (!raw) return games;
  try {
    const map = JSON.parse(raw) as Record<string, GameStatus>;
    return games.map(g => map[g.slug] ? { ...g, status: map[g.slug]! } : g);
  } catch {
    return games;
  }
}

export default function LaunchPage() {
  const games = overlayStatuses(GAMES).filter(g => g.status !== "hidden");
  return (
    <main className="fq-container" aria-label="Games launcher">
      <h1 data-testid="launcher-title">Play</h1>
      <Grid>
        {games.map(g => (
          <GameCard
            key={g.slug}
            title={g.title}
            description={g.description}
            href={g.path}
            status={g.status}
            testId={`game-card-${g.slug}`}
          />
        ))}
      </Grid>
    </main>
  );
}
