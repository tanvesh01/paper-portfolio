"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { ColorPickerPopover } from "@/components/ui/color-picker";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { DEFAULT_PARAMS, renderProcedural, type ProceduralParams } from "./engine";
import { encodeParams } from "./params";

const ASPECT = 1.492;
const PLATE_WIDTH = 1180;

/**
 * The page shells.
 *
 * Every layout renders the same canvas, controls, and state; only the arrangement of the
 * three regions (art, controls, meta) changes. Keeping them in one component means a
 * control added to `controls` appears in all four, and none of them can drift.
 */
export type PlateLayout = "split" | "overlay" | "dock" | "stack";

/**
 * The wave frequencies worth offering.
 *
 * A continuous track spends most of its travel on frequencies that shimmer rather than
 * read, so the useful ones are a fixed list and Freq is a Select instead of a slider.
 */
const WAVE_FREQS = [0.5, 1, 1.6, 2.5, 3.5];

/**
 * The plate, driven by Fluid Functionalism components.
 *
 * Fifteen numeric axes, two colours from the library's own picker, and a seed. Everything
 * cut from the old control list was either dead in the render (fibre moved 0% of pixels
 * at every value) or a second control over the same curve; see the constants in
 * `engine.ts`.
 *
 * `initial` comes from the server, which reads the query string. The URL is the artwork:
 * a copied link reproduces the plate, and there is no other saved state.
 */
export default function PlateStudio({
  initial,
  layout = "split",
}: {
  initial: ProceduralParams;
  layout?: PlateLayout;
}) {
  const [params, setParams] = useState<ProceduralParams>(initial);
  const [renderMs, setRenderMs] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Render off the interaction path, so dragging a slider stays smooth even though a
  // full plate takes well over a frame.
  useEffect(() => {
    let cancelled = false;
    const frame = window.requestAnimationFrame(() => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = PLATE_WIDTH;
      canvas.height = Math.round(PLATE_WIDTH / ASPECT);
      const start = performance.now();
      renderProcedural(ctx, canvas.width, canvas.height, params);
      setRenderMs(performance.now() - start);
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [params]);

  const set = useCallback(<K extends keyof ProceduralParams>(key: K, value: ProceduralParams[K]) => {
    setParams((current) => ({ ...current, [key]: value }));
  }, []);

  const copyLink = useCallback(async () => {
    const query = encodeParams(params);
    const url = `${window.location.origin}${window.location.pathname}?${query.toString()}`;
    window.history.replaceState(null, "", `?${query.toString()}`);
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }, [params]);

  const download = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `procedural-field-${params.seed}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [params.seed]);

  // Every integer is a different plate, so a step-one track cannot be aimed. A reroll
  // moves to the next seed, and the exact number stays editable.
  const reroll = useCallback(() => {
    setParams((current) => ({ ...current, seed: (current.seed % 9999) + 1 }));
  }, []);

  // Every adjustment panel in the references carries one: a way back to the plate the
  // page is tuned around. The seed is part of the composition, so it resets too.
  const reset = useCallback(() => {
    setParams(DEFAULT_PARAMS);
  }, []);

  /** The groups, as data, so each shell can lay them out differently. */
  const groups = useMemo(
    () => [
      {
        title: "Field",
        rows: (
          <>
            <Axis label="Bumps" value={params.bumpCount} min={0} max={18} step={1} onChange={(v) => set("bumpCount", v)} />
            <Axis label="Wave" value={params.waveAmp} min={0} max={3} step={0.05} onChange={(v) => set("waveAmp", v)} />
            <Axis label="Angle" value={params.waveAngle} min={0} max={180} step={1} onChange={(v) => set("waveAngle", v)} />
            <Row label="Freq">
              <Select
                size="compact"
                value={String(nearest(WAVE_FREQS, params.waveFreq))}
                onValueChange={(index) => set("waveFreq", WAVE_FREQS[Number(index)] ?? WAVE_FREQS[0])}
              >
                <SelectTrigger aria-label="Wave frequency" className="w-full justify-between" />
                <SelectContent>
                  {WAVE_FREQS.map((freq, index) => (
                    <SelectItem key={freq} index={index} value={String(index)}>
                      {`${freq}\u00d7`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Row>
            <Axis label="Curve" value={params.waveCurve} min={0} max={2} step={0.05} onChange={(v) => set("waveCurve", v)} />
            <Axis label="Noise" value={params.noiseAmp} min={0} max={1.5} step={0.02} onChange={(v) => set("noiseAmp", v)} />
            <Axis label="Detail" value={params.noiseScale} min={0.5} max={8} step={0.1} onChange={(v) => set("noiseScale", v)} />
          </>
        ),
      },
      {
        title: "Contours",
        rows: (
          <>
            <Axis label="Levels" value={params.contourLevels} min={0} max={40} step={1} onChange={(v) => set("contourLevels", v)} />
            <Axis label="Weight" value={params.contourWeight} min={0.0006} max={0.006} step={0.0002} onChange={(v) => set("contourWeight", v)} />
          </>
        ),
      },
      {
        title: "Marks",
        rows: (
          <>
            <Axis label="Bands" value={params.bands} min={1} max={10} step={1} onChange={(v) => set("bands", v)} />
            <Axis label="Width" value={params.bandWidth} min={0.03} max={0.5} step={0.01} onChange={(v) => set("bandWidth", v)} />
            <Axis label="Density" value={params.dotDensity} min={0} max={1.5} step={0.02} onChange={(v) => set("dotDensity", v)} />
            <Axis label="Size" value={params.dotScale} min={0.4} max={3} step={0.05} onChange={(v) => set("dotScale", v)} />
            <Axis label="Streak" value={params.dotStreak} min={0} max={2} step={0.02} onChange={(v) => set("dotStreak", v)} />
          </>
        ),
      },
      {
        title: "Stock",
        rows: (
          <>
            <Axis label="Grain" value={params.grain} min={0} max={1} step={0.02} onChange={(v) => set("grain", v)} />
            <ColorPickerPopover
              size="compact"
              value={params.ink}
              onValueChange={(value) => set("ink", value)}
              triggerLabel="Ink"
              triggerClassName="w-full justify-between"
            />
            <ColorPickerPopover
              size="compact"
              value={params.paper}
              onValueChange={(value) => set("paper", value)}
              triggerLabel="Paper"
              triggerClassName="w-full justify-between"
            />
          </>
        ),
      },
    ],
    [params, set],
  );

  const canvas = (
    <canvas ref={canvasRef} className="block h-auto w-full" aria-label="Procedural plate" />
  );

  const meta = (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-white/45">
      <span>{renderMs === null ? "rendering…" : `${renderMs.toFixed(0)} ms`}</span>
      <span>
        {PLATE_WIDTH} × {Math.round(PLATE_WIDTH / ASPECT)}
      </span>
      <span>seed {params.seed}</span>
      <span className="ml-auto flex gap-1.5">
        <button
          type="button"
          onClick={copyLink}
          className="border border-white/20 px-2.5 py-1 uppercase tracking-wider text-white/60 transition-colors hover:border-white/50 hover:text-white"
        >
          {copied ? "Copied" : "Copy link"}
        </button>
        <button
          type="button"
          onClick={download}
          className="border border-white/20 px-2.5 py-1 uppercase tracking-wider text-white/60 transition-colors hover:border-white/50 hover:text-white"
        >
          PNG
        </button>
      </span>
    </div>
  );

  const header = (
    <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
      <button
        type="button"
        onClick={reroll}
        className="rounded border border-neutral-300 px-2 py-0.5 uppercase tracking-wider text-neutral-600 transition-colors hover:border-neutral-500 hover:text-neutral-900"
      >
        Reroll
      </button>
      <label className="flex items-center gap-1.5">
        <span>Seed</span>
        <input
          type="number"
          min={1}
          max={9999}
          value={params.seed}
          onChange={(event) => {
            const next = Number.parseInt(event.target.value, 10);
            if (Number.isFinite(next)) set("seed", Math.max(1, Math.min(9999, next)));
          }}
          className="w-16 rounded border border-neutral-300 bg-white px-1.5 py-0.5 tabular-nums text-neutral-800 outline-none focus:border-neutral-500"
        />
      </label>
      <button
        type="button"
        onClick={reset}
        className="ml-auto uppercase tracking-wider text-neutral-400 transition-colors hover:text-neutral-900"
      >
        Reset
      </button>
    </div>
  );

  /** Vertical stack of groups: the sidebar and the overlay card. */
  const stack = (
    <>
      {header}
      <div className="pt-2">
        {groups.map((group) => (
          <section
            key={group.title}
            className="border-t border-neutral-200 pt-2 pb-2 first:border-t-0 first:pt-0 last:pb-0"
          >
            <h2 className="mb-1 font-mono text-[9.5px] uppercase tracking-wider text-neutral-400">
              {group.title}
            </h2>
            <div>{group.rows}</div>
          </section>
        ))}
      </div>
    </>
  );

  /** Side-by-side columns: the bottom dock and the below-fold grid. */
  const columns = (withHeader: boolean) => (
    <>
      {withHeader && <div className="mb-2">{header}</div>}
      <div className="grid grid-cols-2 gap-x-5 gap-y-3 lg:grid-cols-4">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="mb-1 font-mono text-[9.5px] uppercase tracking-wider text-neutral-400">
              {group.title}
            </h2>
            <div>{group.rows}</div>
          </section>
        ))}
      </div>
    </>
  );

  const card =
    "slider-surface rounded-lg bg-white p-3 text-neutral-900 ring-1 ring-black/10";

  if (layout === "overlay") {
    // The art fills the viewport and the panel floats over it, the way an editor's
    // inspector sits above the document rather than beside it.
    //
    // Below `md` there is no room beside the art, so the panel drops into normal flow
    // under it: a panel that covers the plate on a phone is worse than one below it.
    // One instance moves between the two positions, so its state is never duplicated.
    return (
      <div className="relative w-full bg-black">
        <div className="min-h-[calc(100vh-4.5rem)] overflow-hidden">
          <div className="flex items-center justify-center p-4 md:absolute md:inset-0 md:p-8">
            <div className="w-full max-w-[1400px] shadow-[0_30px_80px_rgba(0,0,0,0.6)]">{canvas}</div>
          </div>
          {/* A solid strip, not a gradient: the meta text has to stay legible over a
              plate that can be any colour. */}
          <div className="border-t border-white/10 bg-black/90 px-4 py-2 md:absolute md:inset-x-0 md:bottom-0 md:px-8">
            {meta}
          </div>
        </div>
        <aside
          className={`${card} mx-4 mt-4 shadow-[0_18px_50px_rgba(0,0,0,0.45)] md:absolute md:top-6 md:right-8 md:mx-0 md:mt-0 md:max-h-[calc(100vh-10rem)] md:w-[320px] md:overflow-y-auto md:backdrop-blur-md`}
          aria-label="Procedural field controls"
        >
          {stack}
        </aside>
      </div>
    );
  }

  if (layout === "dock") {
    // A single centred plate with the controls as a dock along the bottom edge, grouped
    // into columns. The art keeps the full width of the eye; nothing sits beside it.
    return (
      <div className="mx-auto w-full max-w-[1500px] px-4 pb-6 md:px-8">
        {/* The plate is width-scaled, so its height is bounded by capping the width: the
            dock has to stay on screen without the reader scrolling to find it. */}
        <div
          className="mx-auto w-full bg-white/5 ring-1 ring-white/10 shadow-[0_20px_44px_rgba(0,0,0,0.5)]"
          style={{ maxWidth: "min(1080px, calc((100vh - 480px) * 1.492))" }}
        >
          {canvas}
        </div>
        <div
          className="mx-auto mt-2 w-full"
          style={{ maxWidth: "min(1080px, calc((100vh - 480px) * 1.492))" }}
        >
          {meta}
        </div>
        <aside
          className={`${card} mt-4 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.10)]`}
          aria-label="Procedural field controls"
        >
          {columns(true)}
        </aside>
      </div>
    );
  }

  if (layout === "stack") {
    // Print-sheet order: the plate runs edge to edge at the top, the controls follow as a
    // four-column grid below it. The page scrolls; nothing is pinned.
    return (
      <div className="mx-auto w-full max-w-[1500px] px-4 pb-10 md:px-8">
        {/* Capped so the first row of controls is visible in the same screen as the
            plate; the rest of the grid follows on scroll. */}
        <div
          className="mx-auto bg-white/5 ring-1 ring-white/10 shadow-[0_20px_44px_rgba(0,0,0,0.5)]"
          style={{ maxWidth: "calc((100vh - 520px) * 1.492)" }}
        >
          {canvas}
        </div>
        <div className="mx-auto mt-2.5" style={{ maxWidth: "calc((100vh - 520px) * 1.492)" }}>
          {meta}
        </div>
        <aside
          className={`${card} mt-6 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.10)]`}
          aria-label="Procedural field controls"
        >
          {columns(true)}
        </aside>
      </div>
    );
  }

  // split: art left, inspector right. The baseline.
  return (
    <div className="mx-auto w-full max-w-[1720px] px-4 pb-8 md:px-8">
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[minmax(0,1fr)_348px] md:gap-8">
        <main className="min-w-0" aria-label="Procedural field output">
          <div className="bg-white/5 shadow-[0_20px_44px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
            {canvas}
          </div>
          <div className="mt-2.5">{meta}</div>
        </main>

        <aside
          className={`${card} w-full shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.10)] md:sticky md:top-6 md:max-h-[calc(100vh-3rem)] md:overflow-y-auto`}
          aria-label="Procedural field controls"
        >
          {stack}
        </aside>
      </div>
    </div>
  );
}

/** A row that is not a slider but must line up with one: same label column, same pitch. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-0.5 flex items-center gap-2">
      <span className="min-w-[6.25rem] font-sans text-[12px] leading-[18px] text-neutral-500">
        {label}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

interface AxisProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

/**
 * One numeric axis.
 *
 * The value is snapped to the step grid before it reaches state. The slider snaps with
 * `round((v - min) / step) * step + min`, which lands on values like 0.30000000000000004,
 * and one plate would then serialise as two different URLs.
 */
function Axis({ label, value, min, max, step, onChange }: AxisProps) {
  return (
    <Slider
      size="compact"
      label={label}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(next) => onChange(roundToStep(next as number, min, step))}
      className="[&>span:first-child]:min-w-[6.25rem] !mb-0.5"
    />
  );
}

/** Snap to the step grid and trim float noise, so equal plates give equal URLs. */
function roundToStep(value: number, min: number, step: number): number {
  const snapped = Math.round((value - min) / step) * step + min;
  return Number(snapped.toFixed(4));
}

/** The index of the nearest entry, for a value that must land on a fixed set. */
function nearest(values: number[], target: number): number {
  let best = 0;
  for (let i = 1; i < values.length; i += 1) {
    if (Math.abs((values[i] ?? 0) - target) < Math.abs((values[best] ?? 0) - target)) best = i;
  }
  return best;
}
