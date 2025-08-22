export type GameStatus = "active" | "inactive" | "hidden";

export interface GameConfig {
  id: string;
  name: string;
  description: string;
  status: GameStatus;
  path: string;
  icon?: string;
  order: number;
}

export const games: GameConfig[] = [
  {
    id: "flag-quiz",
    name: "Flag Quiz",
    description: "Guess countries by their flags",
    status: "active",
    path: "/flag-quiz",
    order: 1,
  },
];

export const gamesById: Record<string, GameConfig> = Object.fromEntries(
  games.map((g) => [g.id, g])
);
