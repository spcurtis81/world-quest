import Link from "next/link";
import type { GameMeta } from "@config/shared";
import { games } from "@config/shared";

export default function LegacyLauncherPage() {
  const visible: GameMeta[] = games.filter((g) => g.status !== "hidden");

  return (
    <main>
      <h1 data-testid="launcher-legacy-title">Launcher (legacy)</h1>
      <ul data-testid="launcher-legacy-list">
        {visible.map((g) => (
          <li key={g.id} data-testid={`legacy-card-${g.id}`}>
            {g.status === "active" ? (
              <Link href={g.path} role="link">
                {g.name}
              </Link>
            ) : (
              <span role="link" aria-disabled="true">
                {g.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}