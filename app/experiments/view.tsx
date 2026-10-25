import type { Metadata } from "next";
import Link from "next/link";
import PlateStudio, { type PlateLayout } from "@/components/plate/PlateStudio";
import { decodeParams } from "@/components/plate/params";

export const metadata: Metadata = {
  title: "Experiments | Tanvesh",
  description: "Deterministic visual experiments with live mathematical controls.",
};

/** Turn Next's searchParams object into the query the plate reads. */
export function queryFrom(
  searchParams: Record<string, string | string[] | undefined>,
): URLSearchParams {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") query.set(key, value);
  }
  return query;
}

/**
 * The experiments page, in one of four arrangements.
 *
 * The shells share everything except layout, so the variants differ only in where the
 * canvas, the controls and the meta strip sit.
 */
export function ExperimentsView({
  searchParams,
  layout,
  name,
}: {
  searchParams: Record<string, string | string[] | undefined>;
  layout: PlateLayout;
  name: string;
}) {
  return (
    <div className="min-h-screen bg-black">
      <nav
        aria-label="Primary"
        className="flex items-baseline gap-6 px-4 py-6 font-mono uppercase md:px-8"
      >
        <Link href="/" className="text-white transition-colors hover:text-primary">
          Tanvesh
        </Link>
        <span className="text-primary">Experiments</span>
        <span className="ml-auto text-white/35">{name}</span>
      </nav>
      <PlateStudio initial={decodeParams(queryFrom(searchParams))} layout={layout} />
    </div>
  );
}
