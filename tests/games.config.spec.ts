import { test, expect } from "@playwright/test";
import { GAMES as games } from "@lib/shared";

test.describe("games config", () => {
  test("loads and contains required fields", async () => {
    expect(Array.isArray(games)).toBeTruthy();
    expect(games.length).toBeGreaterThan(0);
    const first = games[0];
    expect(typeof first.id).toBe("string");
    expect(typeof first.name).toBe("string");
    expect(typeof first.description).toBe("string");
    expect(["active", "inactive", "hidden"]).toContain(first.status);
    expect(typeof first.path).toBe("string");
    expect(typeof first.order).toBe("number");
  });

  test("includes Flag Quiz as first entry", async () => {
    const first = games[0];
    expect(first.id).toBe("flag-quiz");
    expect(first.path).toBe("/flag-quiz");
  });
});
