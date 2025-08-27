import React from "react";
import Link from "next/link";
import { games, type GameMeta } from "@config/shared";

function LegacyLauncher() {
  const visibleGames = games.filter((g) => g.status !== "hidden");

  return (
    <main style={{ padding: "1rem" }}>
      <h1 data-testid="launcher-legacy-title">Launcher (legacy)</h1>
      <ul data-testid="launcher-legacy-list" style={{ listStyle: "none", padding: 0, margin: "1rem 0" }}>
        {visibleGames.map((game: GameMeta) => {
          const testId = `launcher-legacy-item-${game.id}`;
          return (
            <li key={game.id} data-testid={testId} style={{ marginBottom: "0.5rem" }}>
              {game.status === "active" ? (
                <Link href={game.path}>{game.name}</Link>
              ) : (
                <span role="link" aria-disabled="true" style={{ opacity: 0.6, cursor: "not-allowed" }}>
                  {game.name}
                </span>
              )}
              {game.description ? (
                <div style={{ fontSize: "0.9rem", color: "#555" }}>{game.description}</div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default LegacyLauncher;