import { filterByRegion, EU_CODES } from "./regions";

test("filterByRegion EU only returns codes in EU set", () => {
  const items = [{ code: "FR" }, { code: "SY" }, { code: "DE" }, { code: "xx" as any }];
  const eu = filterByRegion(items, "EU");
  expect(eu.length).toBeGreaterThan(0);
  expect(eu.every(i => EU_CODES.has(String(i.code).toUpperCase()))).toBe(true);
});