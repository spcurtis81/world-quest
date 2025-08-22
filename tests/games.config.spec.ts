import { test, expect } from "@playwright/test";
import { GAMES } from "@lib/shared";

test.describe("games registry", () => {
  test("loads and contains required fields", () => {
    expect(Array.isArray(GAMES)).toBe(true);
    expect(GAMES.length).toBeGreaterThan(0);
    const first: any = GAMES[0];
    const title = first.title ?? first.name;
    expect(typeof first.id).toBe("string");
    expect(typeof first.slug).toBe("string");
    expect(typeof title).toBe("string");
    expect(typeof first.description).toBe("string");
    expect(typeof first.path).toBe("string");
    expect(["active","hidden","disabled","coming_soon"]).toContain(first.status);
  });

  test("includes Flag Quiz as first entry", () => {
    const first = GAMES[0];
    expect(first.id).toBe("flag-quiz");
    expect(first.path).toBe("/flag-quiz");
  });
});
