/**
 * DeFiLlama uses kebab-case project slugs. Consumer-facing UI should show
 * the protocols' actual brand names. This file is the single source of truth
 * for the display mapping.
 */

const NAMES: Record<string, string> = {
  "aave-v3": "Aave",
  "morpho-blue": "Morpho",
  "moonwell": "Moonwell",
  "fluid-lending": "Fluid",
  "compound-v3": "Compound",
  "spark": "Spark",
  "euler-v2": "Euler",
};

/** "aave-v3" → "Aave"; falls back to the original slug if unknown. */
export function protocolName(slug: string): string {
  return NAMES[slug] ?? slug;
}

/** Versioned name for places where the version matters (debug, deeplinks). */
export function protocolNameWithVersion(slug: string): string {
  const base = protocolName(slug);
  if (slug === "aave-v3") return `${base} V3`;
  if (slug === "compound-v3") return `${base} V3`;
  if (slug === "euler-v2") return `${base} V2`;
  if (slug === "morpho-blue") return base; // "Blue" is internal, not user-facing
  if (slug === "fluid-lending") return base;
  return base;
}
