"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { ColorPickerPopover } from "@/components/ui/color-picker";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { DEFAULT_PARAMS, renderProcedural, type ProceduralParams } from "./engine";
import { encodeParams } from "./params";
import { AXIS_GROUPS, WAVE_FREQS, nearestIndex } from "./axes";

const ASPECT = 1.492;
const PLATE_WIDTH = 1180;

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
  children,
}: {
  initial: ProceduralParams;
  children: React.ReactNode;
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
    () =>
      AXIS_GROUPS.map((group) => ({
        title: group.title,
        rows: (
          <>
            {group.axes.map((axis) => (
              <Axis
                key={axis.key}
                label={axis.label}
                value={params[axis.key]}
                steps={axis.steps}
                onChange={(v) => set(axis.key, v)}
              />
            ))}
            {group.title === "Field" && (
              <Row label="Freq">
                <Select
                  size="compact"
                  value={String(nearestIndex(WAVE_FREQS, params.waveFreq))}
                  onValueChange={(index) =>
                    set("waveFreq", WAVE_FREQS[Number(index)] ?? WAVE_FREQS[0])
                  }
                >
                  <SelectTrigger aria-label="Wave frequency" className="h-9 w-full justify-between" />
                  <SelectContent className="slider-surface">
                    {WAVE_FREQS.map((freq, index) => (
                      <SelectItem key={freq} index={index} value={String(index)}>
                        {`${freq}\u00d7`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Row>
            )}
            {group.title === "Stock" && (
              // The triggers are inline-flex with no margin of their own, so side by
              // side they touch; the grid gives each an equal column and a real gap.
              // Their height is matched to a slider row so the rhythm holds.
              <div className="grid grid-cols-2 gap-2 [&_button]:h-9">
                <ColorPickerPopover
                  size="compact"
                  value={params.ink}
                  onValueChange={(value) => set("ink", value)}
                  triggerLabel="Ink"
                  triggerClassName="w-full justify-between"
                  className="slider-surface"
                />
                <ColorPickerPopover
                  size="compact"
                  value={params.paper}
                  onValueChange={(value) => set("paper", value)}
                  triggerLabel="Paper"
                  triggerClassName="w-full justify-between"
                  className="slider-surface"
                />
              </div>
            )}
          </>
        ),
      })),
    [params, set],
  );


  const canvas = (
    <canvas ref={canvasRef} className="block h-auto w-full" aria-label="Procedural plate" />
  );

  const meta = (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
      <span>{renderMs === null ? "rendering…" : `${renderMs.toFixed(0)} ms`}</span>
      <span>
        {PLATE_WIDTH} × {Math.round(PLATE_WIDTH / ASPECT)}
      </span>
      <span>seed {params.seed}</span>
      <span className="ml-auto flex gap-1.5">
        <button
          type="button"
          onClick={copyLink}
          className="border border-neutral-300 px-2.5 py-1 uppercase tracking-wider text-neutral-600 transition-colors hover:border-neutral-500 hover:text-neutral-900"
        >
          {copied ? "Copied" : "Copy link"}
        </button>
        <button
          type="button"
          onClick={download}
          className="border border-neutral-300 px-2.5 py-1 uppercase tracking-wider text-neutral-600 transition-colors hover:border-neutral-500 hover:text-neutral-900"
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
        className="ml-auto uppercase tracking-wider text-neutral-600 transition-colors hover:text-neutral-900"
      >
        Reset
      </button>
    </div>
  );

  /** The controls, as a vertical stack: the inspector's whole body. */
  const panel = (
    <>
      {header}
      <div className="pt-2">
        {groups.map((group) => (
          <section
            key={group.title}
            className="border-t border-neutral-200 pt-2 pb-2 first:border-t-0 first:pt-0 last:pb-0"
          >
            <h2 className="mb-1 font-mono text-[9.5px] uppercase tracking-wider text-neutral-600">
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

  // Art left, inspector right: the plate stays large while every control sits beside it.
  return (
    <div className="mx-auto w-full max-w-[1720px] px-4 pb-8 md:px-8">
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[minmax(0,1fr)_348px] md:gap-8">
        <main className="min-w-0" aria-label="Procedural field output">
          {/* A light sheet on a light page: the plate reads as paper, not as a screen. */}
          <div className="bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.10)] ring-1 ring-black/10">
            {canvas}
          </div>
          <div className="mt-2.5">{meta}</div>
        </main>

        <aside
          className={`${card} w-full shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.10)] md:sticky md:top-6 md:max-h-[calc(100vh-3rem)] md:overflow-y-auto`}
          aria-label="Procedural field controls"
        >
          {panel}
          {children}
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
  /** The stops this axis snaps to; each renders as a dot on the track. */
  steps: number[];
  onChange: (value: number) => void;
}

/**
 * One numeric axis, drawn as a slider with a dot at every stop.
 *
 * The dots are the point: a continuous track gave no sense of where a control could land,
 * and the thumb is 16px wide, so without them the reader cannot tell 22 levels from 24.
 * The value label is click-to-edit, so an exact number is still one click away.
 */
function Axis({ label, value, steps, onChange }: AxisProps) {
  return (
    <Slider
      size="compact"
      label={label}
      value={value}
      steps={steps}
      showSteps
      onChange={(next) => onChange(next as number)}
      className="[&>span:first-child]:min-w-[5.5rem] !mb-0.5"
    />
  );
}
