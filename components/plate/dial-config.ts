import type { DialConfig } from "dialkit";
import { DEFAULT_PARAMS, type ProceduralParams } from "./engine";

/**
 * The engine's parameters, expressed as a DialKit config.
 *
 * Every control maps one-to-one onto a `ProceduralParams` field, and every range is the
 * one that actually changes the plate. DialKit derives labels from the keys, so the keys
 * are named for what they look like on the panel, not for the code.
 *
 * Folders keep the panel navigable: twenty controls in one list is unreadable.
 */
export const DIAL_CONFIG = {
  field: {
    bumps: [DEFAULT_PARAMS.bumpCount, 0, 18, 1],
    wave: [DEFAULT_PARAMS.waveAmp, 0, 3, 0.05],
    waveAngle: [DEFAULT_PARAMS.waveAngle, 0, 180, 1],
    waveFreq: [DEFAULT_PARAMS.waveFreq, 0, 5, 0.05],
    waveCurve: [DEFAULT_PARAMS.waveCurve, 0, 2, 0.05],
    noise: [DEFAULT_PARAMS.noiseAmp, 0, 1.5, 0.02],
    noiseScale: [DEFAULT_PARAMS.noiseScale, 0.5, 8, 0.1],
  },
  contours: {
    levels: [DEFAULT_PARAMS.contourLevels, 0, 60, 1],
    weight: [DEFAULT_PARAMS.contourWeight, 0, 0.008, 0.0002],
  },
  marks: {
    bands: [DEFAULT_PARAMS.bands, 0, 10, 1],
    bandWidth: [DEFAULT_PARAMS.bandWidth, 0.03, 0.5, 0.01],
    bandEdge: [DEFAULT_PARAMS.bandContrast, 0.5, 6, 0.1],
    density: [DEFAULT_PARAMS.dotDensity, 0, 1.5, 0.02],
    minSize: [DEFAULT_PARAMS.dotMin, 0, 0.012, 0.0004],
    maxSize: [DEFAULT_PARAMS.dotMax, 0.001, 0.03, 0.0005],
    jitter: [DEFAULT_PARAMS.dotJitter, 0, 1.5, 0.02],
    streak: [DEFAULT_PARAMS.dotStreak, 0, 2, 0.02],
  },
  stock: {
    grain: [DEFAULT_PARAMS.grain, 0, 1, 0.02],
    fibre: [DEFAULT_PARAMS.fibre, 0, 1, 0.02],
  },
  colour: {
    ink: DEFAULT_PARAMS.ink,
    paper: DEFAULT_PARAMS.paper,
  },
  seed: [DEFAULT_PARAMS.seed, 1, 9999, 1],
} satisfies DialConfig;

/** The shape DialKit resolves the config above into. */
export interface DialValues {
  field: {
    bumps: number;
    wave: number;
    waveAngle: number;
    waveFreq: number;
    waveCurve: number;
    noise: number;
    noiseScale: number;
  };
  contours: { levels: number; weight: number };
  marks: {
    bands: number;
    bandWidth: number;
    bandEdge: number;
    density: number;
    minSize: number;
    maxSize: number;
    jitter: number;
    streak: number;
  };
  stock: { grain: number; fibre: number };
  colour: { ink: string; paper: string };
  seed: number;
}

/**
 * Map panel values onto engine parameters.
 *
 * The panel groups things for a reader; the engine wants one flat record. Keeping the
 * mapping in one place means neither side has to know the other's shape.
 */
export function toParams(values: DialValues): ProceduralParams {
  return {
    seed: Math.round(values.seed),
    ink: values.colour.ink,
    paper: values.colour.paper,
    bumpCount: Math.round(values.field.bumps),
    waveAmp: values.field.wave,
    waveAngle: values.field.waveAngle,
    waveFreq: values.field.waveFreq,
    waveCurve: values.field.waveCurve,
    noiseAmp: values.field.noise,
    noiseScale: values.field.noiseScale,
    contourLevels: Math.round(values.contours.levels),
    contourWeight: values.contours.weight,
    bands: Math.round(values.marks.bands),
    bandWidth: values.marks.bandWidth,
    bandContrast: values.marks.bandEdge,
    dotDensity: values.marks.density,
    dotMin: values.marks.minSize,
    dotMax: values.marks.maxSize,
    dotJitter: values.marks.jitter,
    dotStreak: values.marks.streak,
    grain: values.stock.grain,
    fibre: values.stock.fibre,
  };
}
