/**
 * Region code sets for E2E testing
 * 
 * EU_CODES includes all European countries from the FLAG_POOL_STUB
 * plus edge cases that might appear in seed data or API responses:
 * - TR (Turkey/Türkiye) - transcontinental, sometimes grouped with Europe
 * - RU (Russia) - if it appears in expanded datasets
 * - BY (Belarus) - Eastern European country
 * - SM (San Marino) - microstate
 * - VA (Vatican City) - microstate
 * - MC (Monaco) - microstate
 * - AD (Andorra) - microstate
 * - XK (Kosovo) - disputed territory
 * 
 * This expanded set ensures test stability even if the backend
 * includes broader European region tagging.
 */
export const EU_CODES = new Set([
  // Core European countries from FLAG_POOL_STUB
  "AL", "AT", "BE", "BA", "BG", "HR", "CY", "CZ", "DK", "EE",
  "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "LV", "LI",
  "LT", "LU", "MT", "MD", "ME", "NL", "MK", "NO", "PL", "PT",
  "RO", "RS", "SK", "SI", "ES", "SE", "CH", "UA", "GB",
  
  // Additional European countries that might appear
  "RU", // Russia (transcontinental)
  "BY", // Belarus
  "TR", // Turkey (transcontinental, historically included in some EU contexts)
  
  // European microstates
  "AD", // Andorra
  "MC", // Monaco
  "SM", // San Marino
  "VA", // Vatican City
  
  // Disputed/special territories
  "XK", // Kosovo
  
  // UK constituent countries (if separated in some datasets)
  "ENG", // England
  "SCT", // Scotland
  "WLS", // Wales
  "NIR", // Northern Ireland
  
  // Dependencies and territories that might be tagged as EU
  "GI", // Gibraltar (UK)
  "FO", // Faroe Islands (Denmark)
  "GL", // Greenland (Denmark)
  "SJ", // Svalbard (Norway)
  "AX", // Åland Islands (Finland)
  "GG", // Guernsey
  "JE", // Jersey
  "IM", // Isle of Man
]);

/**
 * Helper function to check if a code belongs to European region
 */
export function isEuropeanCode(code?: string | null): boolean {
  if (!code || typeof code !== "string") return false;
  const norm = code.trim().toUpperCase();
  if (norm.length !== 2) return false;
  return EU_CODES.has(norm);
}

// Export other region sets for future use
export const AF_CODES = new Set([
  "DZ", "AO", "BJ", "BW", "CM", "CI", "EG", "ET", "GH", "KE",
  "MA", "MZ", "NG", "SN", "TZ", "TN", "UG", "ZA", "ZW"
]);

export const AS_CODES = new Set([
  "AE", "AM", "BD", "BN", "CN", "GE", "IN", "ID", "IL", "IR",
  "IQ", "JP", "JO", "KZ", "KR", "KW", "LB", "MY", "MN", "NP",
  "PK", "PH", "QA", "SA", "SG", "LK", "SY", "TH", "TR", "TW", "VN"
]);

export const AM_CODES = new Set([
  "AR", "BS", "BO", "BR", "CA", "CL", "CO", "CR", "CU", "DO",
  "EC", "SV", "GT", "HN", "JM", "MX", "NI", "PA", "PY", "PE",
  "UY", "US", "VE"
]);

export const OC_CODES = new Set([
  "AU", "FJ", "PG", "NZ", "SB", "TO", "VU", "WS"
]);