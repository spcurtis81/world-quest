import React from "react";
import { games } from "@config/shared";
import { GameCard } from "@ui/shared";

export const dynamic = "force-static";

export default function LaunchPage() {
  const visible = games.filter((g) => g.status !== "hidden");
  return (
    <main>
      <h1 data-testid="launcher-title">Choose a game</h1>
      <ul data-testid="launcher-grid">
        {visible.map((g) => (
          <GameCard
            key={g.id}
            id={g.id}
            name={g.name}
            description={g.description}
            href={g.status === "active" ? g.path : "#"}
            disabled={g.status !== "active"}
          />
        ))}
      </ul>
    </main>
  );
}
