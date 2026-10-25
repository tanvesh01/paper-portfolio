"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DialRoot, useDialKit } from "dialkit";
import { renderProcedural } from "./engine";
import { DIAL_CONFIG, toParams, type DialValues } from "./dial-config";

const ASPECT = 1.492;
const PLATE_WIDTH = 1180;

/**
 * The plate, driven by DialKit.
 *
 * DialKit owns the controls; this component reads its values, renders the plate, and
 * offers the two things a panel cannot do on its own — copy a shareable link, and export
 * a PNG.
 */
export default function PlateStudio() {
  const values = useDialKit("Procedural field", DIAL_CONFIG, {
    id: "procedural-field",
    persist: true,
  }) as DialValues;
  const [renderMs, setRenderMs] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const params = useMemo(() => toParams(values), [values]);

  // Render off the interaction path: a full plate takes well over a frame, and dragging a
  // DialKit slider has to stay smooth.
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

  const copyLink = useCallback(async () => {
    // The URL is the artwork: every parameter round-trips through the query string.
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      query.set(key, String(value));
    }
    window.history.replaceState(null, "", `?${query.toString()}`);
    await navigator.clipboard.writeText(window.location.href);
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

  return (
    <div className="mx-auto w-full max-w-[1720px] px-4 pb-8 md:px-8">
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[minmax(0,1fr)_348px] md:gap-8">
        <main className="min-w-0" aria-label="Procedural field output">
          <div className="bg-white/5 shadow-[0_20px_44px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
            <canvas ref={canvasRef} className="block h-auto w-full" />
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-white/45">
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
        </main>

        <aside
          className="w-full md:sticky md:top-6 md:max-h-[calc(100vh-3rem)] md:overflow-y-auto"
          aria-label="Procedural field controls"
        >
          {/* Inline mode fills this column instead of floating over the plate.
              `productionEnabled` is required: DialKit hides the editor in production
              builds by default, which would ship this page with no controls at all. */}
          <DialRoot mode="inline" theme="dark" productionEnabled />
        </aside>
      </div>
    </div>
  );
}
