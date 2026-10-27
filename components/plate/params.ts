import { DEFAULT_PARAMS, type ProceduralParams } from "./engine";

/**
 * The plate as a URL query string.
 *
 * The URL is the artwork: a shared link reproduces the plate exactly, and a reload
 * keeps it. That is why there is no separate saved state — one source of truth.
 */
export function encodeParams(params: ProceduralParams): URLSearchParams {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    query.set(key, String(value));
  }
  return query;
}

/**
 * Read a partial parameter set, falling back to the defaults for anything missing.
 *
 * Unknown and unparseable values are ignored rather than trusted, so a hand-edited URL
 * cannot produce a plate the panel cannot represent.
 */
export function decodeParams(query: URLSearchParams): ProceduralParams {
  const next: ProceduralParams = { ...DEFAULT_PARAMS };

  const ink = query.get("ink");
  const paper = query.get("paper");
  if (ink) next.ink = ink;
  if (paper) next.paper = paper;

  for (const key of NUMERIC_KEYS) {
    const raw = query.get(key);
    if (raw === null) continue;
    const parsed = Number.parseFloat(raw);
    if (Number.isFinite(parsed)) next[key] = parsed;
  }
  return next;
}

/** The engine's numeric parameters, in the order the panel lists them. */
export const NUMERIC_KEYS = [
  "seed",
  "bumpCount",
  "waveAmp",
  "waveAngle",
  "waveFreq",
  "waveCurve",
  "noiseAmp",
  "noiseScale",
  "contourLevels",
  "contourWeight",
  "bands",
  "bandWidth",
  "dotDensity",
  "dotScale",
  "dotStreak",
  "grain",
] as const satisfies readonly Exclude<keyof ProceduralParams, "ink" | "paper" | "contourInk">[];
