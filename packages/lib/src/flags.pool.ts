export type FlagMeta = { code: string; name: string; region: "EU"|"AF"|"AS"|"AM"|"OC" };
/** Stub pool (to be replaced with full list in implementation) */
export const FLAG_POOL_STUB: FlagMeta[] = [
  { code: "CH", name: "Switzerland", region: "EU" },
  { code: "GB", name: "United Kingdom", region: "EU" },
  { code: "DE", name: "Germany", region: "EU" },
  { code: "BR", name: "Brazil", region: "AM" },
  { code: "JP", name: "Japan", region: "AS" },
  { code: "ZA", name: "South Africa", region: "AF" },
  { code: "AU", name: "Australia", region: "OC" },
];

export const REGIONS = [
  { id: "ALL", label: "World" },
  { id: "EU", label: "Europe" },
  { id: "AF", label: "Africa" },
  { id: "AS", label: "Asia" },
  { id: "AM", label: "Americas" },
  { id: "OC", label: "Oceania" },
];
