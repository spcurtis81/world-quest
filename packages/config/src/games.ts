export type GameStatus = "active" | "inactive" | "hidden";

export interface GameMeta {
  id: string;
  name: string;
  description: string;
  status: GameStatus;
  path: string; // e.g. "/flag-quiz"
  icon?: string;
}

export const games: GameMeta[] = [
  {
    id: "flag-quiz",
    name: "Flag Quiz",
    description: "Guess countries by their flags",
    status: "active",
    path: "/flag-quiz",
  },
  {
    id: "capitals",
    name: "Capital Cities",
    description: "Match countries to their capitals",
    status: "inactive",
    path: "/capitals",
  },
  {
    id: "secret-game",
    name: "Secret Game",
    description: "Hidden from launcher",
    status: "hidden",
    path: "/secret",
  },
];
