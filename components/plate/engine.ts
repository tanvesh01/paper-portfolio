/**
 * Deterministic procedural cover composition.
 *
 * The whole image is a function of its parameters and seed: no randomness that is not
 * reproducible, no model, no network. Same inputs give the same plate, byte for byte.
 *
 * The composition follows one idea, borrowed from topographic printing:
 *
 *   scalar field f(x, y)  ──┬──►  level sets at N intervals  ──►  contour lines
 *      (bumps + noise)      │
 *                           └──►  density  ──►  jittered dot sampling  ──►  dot bands
 *                                           │
 *                                 mirror about x = 0.5  ──►  cusps at the seam
 *                                           │
 *                                 paper grain + fibre  ──►  the material
 *
 * The cusps are not drawn. They appear because a mirrored field has a kink at the mirror
 * line, and contour lines meeting that kink turn into chevrons. That artifact is the
 * signature of the technique, so it is left visible.
 */

export interface ProceduralParams {
  seed: number;
  /** Ink colour, as CSS. */
  ink: string;
  /** Paper colour, as CSS. */
  paper: string;
  /** Optional second ink for the contour lines, to separate them from the dots. */
  contourInk?: string;

  /** Number of contour levels. More levels read as a denser map. */
  contourLevels: number;
  /** Contour stroke width, as a fraction of the short edge. */
  contourWeight: number;
  /** How many field sources (bumps) shape the contours. */
  bumpCount: number;
  /**
   * Strength of the directional wave component.
   *
   * This is what turns closed concentric loops into long sweeping contour families that
   * converge at the mirror seam. Without it the field is a set of isolated hills; with it
   * the hills are superimposed on a travelling wave and their contours stretch out.
   */
  waveAmp: number;
  /** Direction of the wave, in degrees. */
  waveAngle: number;
  /** Wave frequency across the sheet. */
  waveFreq: number;
  /** Curvature of the wave fronts: 0 = straight bands, 1 = strongly bowed. */
  waveCurve: number;
  /** How much fractal noise distorts the field. 0 = clean geometry. */
  noiseAmp: number;
  /** Fractal noise frequency. Higher = more, finer detail. */
  noiseScale: number;

  /** Number of horizontal dot bands. */
  bands: number;
  /** Band thickness, as a fraction of the height. */
  bandWidth: number;
  /** Overall dot coverage, 0–1. */
  dotDensity: number;
  /** Dot radius bounds, as a fraction of the short edge. */
  dotMin: number;
  dotMax: number;
  /** How far dots wander from their grid cell, 0–1. */
  dotJitter: number;
  /**
   * How far each mark stretches along the flow, 0–1.
   *
   * Round marks read as polka dots; stretched ones read as printed or drawn marks that
   * follow the field. This is the single biggest difference between a scatter and a
   * composition, so it is a first-class parameter rather than a constant.
   */
  dotStreak: number;
  /** How sharply dots concentrate into bands. 1 = soft, 4 = hard-edged bands. */
  bandContrast: number;

  /** Paper grain strength, 0–1. */
  grain: number;
  /** Fibre strength, 0–1. */
  fibre: number;
}

/** Integer hash, used everywhere a deterministic pseudo-random value is needed. */
function ihash(x: number, y: number, seed: number): number {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(seed | 0, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

const smooth = (t: number): number => t * t * (3 - 2 * t);

/** Value noise: smooth, deterministic, cheap. */
function valueNoise(x: number, y: number, seed: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = smooth(x - xi);
  const yf = smooth(y - yi);

  const a = ihash(xi, yi, seed);
  const b = ihash(xi + 1, yi, seed);
  const c = ihash(xi, yi + 1, seed);
  const d = ihash(xi + 1, yi + 1, seed);

  return (a + (b - a) * xf) * (1 - yf) + (c + (d - c) * xf) * yf;
}

/** Fractal Brownian motion: octaves of value noise. */
function fbm(x: number, y: number, seed: number, octaves = 4): number {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  let norm = 0;
  for (let i = 0; i < octaves; i += 1) {
    sum += valueNoise(x * freq, y * freq, seed + i * 977) * amp;
    norm += amp;
    amp *= 0.5;
    freq *= 2.03;
  }
  return sum / norm;
}

interface Bump {
  x: number;
  y: number;
  radius: number;
  weight: number;
}

/**
 * The scalar field.
 *
 * A sum of Gaussian bumps gives nested, merging contour families — the topographic look —
 * and fractal noise breaks up their regularity so the result is organic rather than
 * diagrammatic. Coordinates are normalised to 0–1 with y pointing down.
 */
function makeField(p: ProceduralParams): (x: number, y: number) => number {
  const angle = (p.waveAngle * Math.PI) / 180;
  const ca = Math.cos(angle);
  const sa = Math.sin(angle);
  const bumps: Bump[] = [];
  for (let i = 0; i < p.bumpCount; i += 1) {
    bumps.push({
      x: ihash(i, 11, p.seed),
      y: ihash(i, 23, p.seed),
      radius: 0.12 + ihash(i, 37, p.seed) * 0.26,
      // Alternating sign gives ridges and valleys, which is what produces the nested
      // V and U families that meet at the mirror seam.
      weight: (ihash(i, 41, p.seed) * 2 - 1) * (0.5 + ihash(i, 53, p.seed) * 0.5),
    });
  }

  return (x: number, y: number): number => {
    let value = 0;
    for (const bump of bumps) {
      const dx = x - bump.x;
      const dy = y - bump.y;
      const d2 = (dx * dx + dy * dy) / (bump.radius * bump.radius);
      value += bump.weight * Math.exp(-d2);
    }
    // A travelling wave along the chosen direction. The curvature term bows the wave
    // fronts, which is what makes the contour families sweep rather than run straight.
    const u = (x - 0.5) * ca + (y - 0.5) * sa;
    const bow = p.waveCurve * Math.pow(u, 2);
    value += p.waveAmp * Math.sin((u + bow) * Math.PI * 2 * p.waveFreq);

    if (p.noiseAmp > 0) {
      value += (fbm(x * p.noiseScale, y * p.noiseScale, p.seed) - 0.5) * p.noiseAmp;
    }
    return value;
  };
}

/** A line segment in normalised coordinates. */
type Segment = [number, number, number, number];

/**
 * Marching squares over a sampled grid.
 *
 * Each cell is classified by which of its four corners exceed the level, and the boundary
 * is interpolated along the edges that straddle it. Segments are emitted unjoined: at
 * this density the shared endpoints read as continuous lines.
 */
function contours(
  field: (x: number, y: number) => number,
  cols: number,
  rows: number,
  levels: number[],
): Segment[] {
  // Sample once; every level reuses the grid.
  const values = new Float32Array((cols + 1) * (rows + 1));
  for (let j = 0; j <= rows; j += 1) {
    for (let i = 0; i <= cols; i += 1) {
      values[j * (cols + 1) + i] = field(i / cols, j / rows);
    }
  }

  const segments: Segment[] = [];
  const at = (i: number, j: number): number => values[j * (cols + 1) + i] ?? 0;

  for (const level of levels) {
    for (let j = 0; j < rows; j += 1) {
      for (let i = 0; i < cols; i += 1) {
        const tl = at(i, j);
        const tr = at(i + 1, j);
        const br = at(i + 1, j + 1);
        const bl = at(i, j + 1);

        const idx =
          (tl > level ? 8 : 0) | (tr > level ? 4 : 0) | (br > level ? 2 : 0) | (bl > level ? 1 : 0);
        if (idx === 0 || idx === 15) continue;

        // Interpolated crossing points on each edge, in cell-local units.
        const x0 = i / cols;
        const y0 = j / rows;
        const cw = 1 / cols;
        const ch = 1 / rows;
        const lerp = (a: number, b: number): number => {
          const d = b - a;
          return Math.abs(d) < 1e-9 ? 0.5 : (level - a) / d;
        };

        const top: [number, number] = [x0 + cw * lerp(tl, tr), y0];
        const right: [number, number] = [x0 + cw, y0 + ch * lerp(tr, br)];
        const bottom: [number, number] = [x0 + cw * lerp(bl, br), y0 + ch];
        const left: [number, number] = [x0, y0 + ch * lerp(tl, bl)];

        const push = (a: [number, number], b: [number, number]): void => {
          segments.push([a[0], a[1], b[0], b[1]]);
        };

        // Standard 16-case table; the ambiguous saddle cases are resolved by the cell's
        // average, which keeps the lines continuous.
        switch (idx) {
          case 1:
          case 14:
            push(left, bottom);
            break;
          case 2:
          case 13:
            push(bottom, right);
            break;
          case 3:
          case 12:
            push(left, right);
            break;
          case 4:
          case 11:
            push(top, right);
            break;
          case 6:
          case 9:
            push(top, bottom);
            break;
          case 7:
          case 8:
            push(left, top);
            break;
          case 5: {
            const avg = (tl + tr + br + bl) / 4;
            if (avg > level) {
              push(left, top);
              push(bottom, right);
            } else {
              push(left, bottom);
              push(top, right);
            }
            break;
          }
          case 10: {
            const avg = (tl + tr + br + bl) / 4;
            if (avg > level) {
              push(top, right);
              push(left, bottom);
            } else {
              push(left, top);
              push(bottom, right);
            }
            break;
          }
          default:
            break;
        }
      }
    }
  }

  return segments;
}

interface Dot {
  x: number;
  y: number;
  r: number;
  /** Rotation of the mark, in radians, following the local flow. */
  angle: number;
  /** Ratio of long to short axis. 1 = circular. */
  stretch: number;
}

/**
 * Dots, clustered into horizontal bands.
 *
 * Points come from a jittered grid, so their spacing is even and their distribution is
 * blue-noise-like rather than clumpy. A band envelope times fractal noise decides which
 * survive and how large they grow, which is what turns a scatter into a set of dense
 * bands with quiet troughs between them.
 */
function dotField(
  p: ProceduralParams,
  densityNoise: (x: number, y: number) => number,
  field: (x: number, y: number) => number,
): Dot[] {
  const dots: Dot[] = [];
  const spacing = 0.016;
  const cols = Math.ceil(1 / spacing);
  const rows = Math.ceil(1 / spacing);

  const centres: number[] = [];
  for (let b = 0; b < p.bands; b += 1) {
    centres.push((b + 0.5) / p.bands);
  }

  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      const gx = i * spacing;
      const gy = j * spacing;

      // Band envelope: 1 at a band centre, falling to 0 between bands. Raising it to a
      // power sharpens the transition, which is what separates a dense band from a truly
      // quiet gap; a Gaussian alone leaves a haze everywhere.
      let envelope = 0;
      for (const c of centres) {
        const d = Math.abs(gy - c) / p.bandWidth;
        envelope = Math.max(envelope, Math.exp(-d * d));
      }
      envelope = Math.pow(envelope, p.bandContrast);
      if (envelope < 0.02) continue;

      const n = densityNoise(gx, gy);
      const density = envelope * (0.25 + n * 1.35) * p.dotDensity;
      if (ihash(i, j, p.seed + 7919) > density) continue;

      const jx = (ihash(i, j, p.seed + 104729) - 0.5) * spacing * p.dotJitter;
      const jy = (ihash(i, j, p.seed + 1299709) - 0.5) * spacing * p.dotJitter;

      // Radius follows density, and a second hashed term skews the distribution so most
      // marks are small and a minority are much larger. A uniform radius reads as
      // polka dots; a skewed one reads as a printed field.
      const t = Math.min(1, density / Math.max(p.dotDensity, 0.001));
      const skew = Math.pow(ihash(i, j, p.seed + 15485863), 2.4);
      const r = p.dotMin + (p.dotMax - p.dotMin) * Math.pow(t, 0.7) * (0.35 + skew * 1.5);

      // Flow direction: the contour direction, which is perpendicular to the field's
      // gradient. Marks laid along it read as following the terrain, the way a hatched
      // engraving or a sanding pass does.
      const e = 0.004;
      const gx1 = field(gx + e, gy) - field(gx - e, gy);
      const gy1 = field(gx, gy + e) - field(gx, gy - e);
      const gradLen = Math.hypot(gx1, gy1);
      // Fall back to the wave angle where the field is flat and the gradient is noise.
      const baseAngle = (p.waveAngle * Math.PI) / 180;
      const angle =
        gradLen > 1e-5 ? Math.atan2(-gx1, gy1) : baseAngle + Math.PI / 2;

      // Stretch grows with density, so band cores carry long streaks and the fringe
      // carries dots — the same taper a brush gives.
      const stretch = 1 + p.dotStreak * t * 2.2;

      dots.push({ x: gx + jx, y: gy + jy, r, angle, stretch });
    }
  }

  return dots;
}

/** A deterministic grain tile, reused as a pattern so the cost is one image, not one pass. */
function grainTile(size: number, seed: number, strength: number): HTMLCanvasElement {
  const tile = document.createElement('canvas');
  tile.width = size;
  tile.height = size;
  const ctx = tile.getContext('2d');
  if (!ctx) return tile;

  const image = ctx.createImageData(size, size);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const n = ihash(x, y, seed);
      const v = Math.round(255 * n);
      const i = (y * size + x) * 4;
      image.data[i] = v;
      image.data[i + 1] = v;
      image.data[i + 2] = v;
      image.data[i + 3] = Math.round(255 * strength * (0.35 + n * 0.65));
    }
  }
  ctx.putImageData(image, 0, 0);
  return tile;
}

/**
 * Render one plate.
 *
 * The left half is drawn once and then mirrored, which is what produces the cusps at the
 * centre line. Drawing the full width twice would cost twice as much and give the same
 * result.
 */
export function renderProcedural(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  p: ProceduralParams,
): void {
  const shortEdge = Math.min(width, height);
  const half = width / 2;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = p.paper;
  ctx.fillRect(0, 0, width, height);

  const half_canvas = document.createElement('canvas');
  half_canvas.width = half;
  half_canvas.height = height;
  const half_ctx = half_canvas.getContext('2d');
  if (!half_ctx) return;

  const field = makeField(p);
  const densityNoise = (x: number, y: number): number =>
    fbm(x * p.noiseScale * 1.6, y * p.noiseScale * 1.6, p.seed + 31337);

  // Contours. Levels are spread across the field's own range so they always fill the
  // sheet, whatever the bumps happened to produce.
  let lo = Infinity;
  let hi = -Infinity;
  const probe = 48;
  for (let j = 0; j <= probe; j += 1) {
    for (let i = 0; i <= probe; i += 1) {
      const v = field((i / probe) * 0.5, j / probe);
      lo = Math.min(lo, v);
      hi = Math.max(hi, v);
    }
  }
  const span = hi - lo || 1;
  const levels = Array.from(
    { length: p.contourLevels },
    (_, k) => lo + span * ((k + 0.5) / p.contourLevels),
  );

  const cols = 260;
  const rows = Math.round((cols * height) / half);
  const segments = contours(field, cols, rows, levels);

  half_ctx.strokeStyle = p.contourInk ?? p.ink;
  half_ctx.lineWidth = Math.max(0.5, p.contourWeight * shortEdge);
  half_ctx.lineCap = 'round';
  half_ctx.beginPath();
  for (const [x1, y1, x2, y2] of segments) {
    half_ctx.moveTo(x1 * half, y1 * height);
    half_ctx.lineTo(x2 * half, y2 * height);
  }
  half_ctx.stroke();

  // Marks, in the same half, over the lines. Each is an ellipse aligned to the local
  // flow, which is what makes the field read as drawn rather than scattered.
  half_ctx.fillStyle = p.ink;
  for (const dot of dotField(p, densityNoise, field)) {
    const radius = Math.max(0.4, dot.r * shortEdge);
    half_ctx.save();
    half_ctx.translate(dot.x * half, dot.y * height);
    half_ctx.rotate(dot.angle);
    half_ctx.beginPath();
    half_ctx.ellipse(0, 0, radius * dot.stretch, radius, 0, 0, Math.PI * 2);
    half_ctx.fill();
    half_ctx.restore();
  }

  // Mirror: left half, then its reflection. The seam kink is the point.
  ctx.drawImage(half_canvas, 0, 0);
  ctx.save();
  ctx.translate(width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(half_canvas, 0, 0);
  ctx.restore();

  // Paper. Grain is a tiled pattern multiplied over the inks so it reads as the stock
  // showing through, not as a filter sitting on top.
  if (p.grain > 0) {
    const tile = grainTile(192, p.seed + 5501, p.grain);
    const pattern = ctx.createPattern(tile, 'repeat');
    if (pattern) {
      ctx.save();
      ctx.globalCompositeOperation = 'overlay';
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }
  }

  if (p.fibre > 0) {
    // Fibre: short, low-opacity strokes in the paper direction, seeded so they never
    // repeat and never change between renders.
    ctx.save();
    ctx.globalCompositeOperation = 'soft-light';
    ctx.strokeStyle = p.ink;
    ctx.globalAlpha = p.fibre * 0.22;
    ctx.lineWidth = Math.max(0.4, shortEdge * 0.0012);
    for (let i = 0; i < 900; i += 1) {
      const x = ihash(i, 3, p.seed + 9001) * width;
      const y = ihash(i, 5, p.seed + 9001) * height;
      const len = (0.01 + ihash(i, 7, p.seed + 9001) * 0.07) * shortEdge;
      const angle = (ihash(i, 11, p.seed + 9001) - 0.5) * 0.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
      ctx.stroke();
    }
    ctx.restore();
  }
}

/** A starting point that resembles a mid-century topographic cover. */
export const DEFAULT_PARAMS: ProceduralParams = {
  seed: 1978,
  ink: '#003898',
  paper: '#b3b7cd',
  contourLevels: 22,
  contourWeight: 0.0016,
  bumpCount: 7,
  waveAmp: 0.9,
  waveAngle: 28,
  waveFreq: 1.6,
  waveCurve: 0.5,
  noiseAmp: 0.55,
  noiseScale: 3.2,
  bands: 3,
  bandWidth: 0.16,
  dotDensity: 0.55,
  dotMin: 0.0016,
  dotMax: 0.008,
  dotJitter: 0.9,
  dotStreak: 0.8,
  bandContrast: 2.2,
  grain: 0.5,
  fibre: 0.5,
};
