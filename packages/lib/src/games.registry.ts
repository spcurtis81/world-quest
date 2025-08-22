export type GameStatus = "active" | "hidden" | "disabled" | "coming_soon";

export interface GameMeta {
  id: string;
  slug: string;
  title: string;
  description: string;
  path: string;
  status: GameStatus;
  icon?: string;
  tags?: string[];
}

export const GAMES: GameMeta[] = [
  {
    id: "flag-quiz",
    slug: "flag-quiz",
    title: "Flag Quiz",
    description: "Guess countries by their flags",
    path: "/flag-quiz",
    status: "active",
    tags: ["geography", "flags"],
  },
  {
    id: "capitals",
    slug: "capitals",
    title: "Capital Cities",
    description: "Match countries to capitals",
    path: "/capitals",
    status: "coming_soon",
  },
];

export function getActiveGames(): GameMeta[] {
  return GAMES.filter((g) => g.status === "active");
}

export function getGameBySlug(slug: string): GameMeta | undefined {
  return GAMES.find((g) => g.slug === slug);
}
