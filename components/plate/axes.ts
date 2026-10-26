import { DEFAULT_PARAMS, type ProceduralParams } from "./engine";

/** The numeric fields the panel drives. Colours and the seed are handled separately. */
export type NumericKey = Exclude<keyof ProceduralParams, "ink" | "paper" | "contourInk">;

export interface AxisDef {
  key: NumericKey;
  label: string;
  /**
   * The stops this axis snaps to; each renders as a dot on the track.
   *
   * A plain `step` was wrong here: the slider snaps the *value* to the grid, so a coarse
   * step silently moved the tuned defaults (Bumps 7 became 8, Angle 28 became 20). An
   * explicit list keeps every default exactly where the plate was designed, and the
   * number of entries is what makes the dots readable on a 216px track.
   */
  steps: number[];
}

export interface AxisGroup {
  title: string;
  axes: AxisDef[];
}

/**
 * Every list below contains that axis's default, so the untouched page still renders the
 * plate it was tuned around. `assertDefaultsAreStops` enforces it at module load.
 */
export const AXIS_GROUPS: AxisGroup[] = [
  {
    title: "Field",
    axes: [
      { key: "bumpCount", label: "Bumps", steps: [0, 3, 7, 11, 15, 18] },
      { key: "waveAmp", label: "Wave", steps: [0, 0.45, 0.9, 1.5, 2.25, 3] },
      { key: "waveAngle", label: "Angle", steps: [0, 28, 60, 90, 120, 150, 180] },
      { key: "waveCurve", label: "Curve", steps: [0, 0.5, 1, 1.5, 2] },
      { key: "noiseAmp", label: "Noise", steps: [0, 0.25, 0.55, 0.75, 1, 1.25, 1.5] },
      { key: "noiseScale", label: "Detail", steps: [0.5, 1.5, 3.2, 5, 6.5, 8] },
    ],
  },
  {
    title: "Contours",
    axes: [
      { key: "contourLevels", label: "Levels", steps: [0, 5, 10, 15, 22, 30, 40] },
      { key: "contourWeight", label: "Weight", steps: [0.0008, 0.0016, 0.0024, 0.0032, 0.004, 0.0048, 0.0056] },
    ],
  },
  {
    title: "Marks",
    axes: [
      { key: "bands", label: "Bands", steps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { key: "bandWidth", label: "Width", steps: [0.05, 0.1, 0.16, 0.25, 0.35, 0.5] },
      { key: "dotDensity", label: "Density", steps: [0, 0.25, 0.55, 0.75, 1, 1.25, 1.5] },
      { key: "dotScale", label: "Size", steps: [0.5, 0.75, 1, 1.5, 2, 2.5, 3] },
      { key: "dotStreak", label: "Streak", steps: [0, 0.4, 0.8, 1.2, 1.6, 2] },
    ],
  },
  {
    title: "Stock",
    axes: [{ key: "grain", label: "Grain", steps: [0, 0.25, 0.5, 0.75, 1] }],
  },
];

/**
 * The wave frequencies worth offering.
 *
 * A continuous track spends most of its travel on frequencies that shimmer rather than
 * read, so the useful ones are a fixed list and Freq is a Select instead of a slider.
 */
export const WAVE_FREQS = [0.5, 1, 1.6, 2.5, 3.5];

/** The index of the nearest entry, for a value that must land on a fixed set. */
export function nearestIndex(values: number[], target: number): number {
  let best = 0;
  for (let i = 1; i < values.length; i += 1) {
    if (Math.abs((values[i] ?? 0) - target) < Math.abs((values[best] ?? 0) - target)) best = i;
  }
  return best;
}

/**
 * Guard: a stop list that omits its default would silently change the plate on load.
 *
 * This throws during development and build rather than shipping a page whose untouched
 * state no longer matches `DEFAULT_PARAMS`.
 */
function assertDefaultsAreStops(): void {
  for (const group of AXIS_GROUPS) {
    for (const axis of group.axes) {
      const fallback = DEFAULT_PARAMS[axis.key];
      if (!axis.steps.some((stop) => Math.abs(stop - fallback) < 1e-9)) {
        throw new Error(
          `Axis "${axis.label}" has no stop for its default ${fallback}; the untouched plate would change.`,
        );
      }
    }
  }
}

assertDefaultsAreStops();
