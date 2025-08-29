export const EU_CODES: Set<string> = new Set([
  "AL","AD","AM","AT","AZ","BY","BE","BA","BG","HR","CY","CZ","DK","EE","FI","FR",
  "GE","DE","GR","HU","IS","IE","IT","KZ","XK","LV","LI","LT","LU","MT","MD","MC",
  "ME","NL","MK","NO","PL","PT","RO","RU","SM","RS","SK","SI","ES","SE","CH","TR",
  "UA","GB","VA"
]);

export type RegionKey = "ALL" | "EU";

/**
 * Filters items by region.
 * Items must have a "code" property (2-letter ISO code).
 */
export function filterByRegion<T extends { code: string }>(
  items: T[],
  region: RegionKey
): T[] {
  if (region === "EU") {
    return items.filter(i => EU_CODES.has(String(i.code).toUpperCase()));
  }
  return items;
}