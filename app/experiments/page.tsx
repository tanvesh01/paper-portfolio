import type { Metadata } from "next";
import Link from "next/link";
import PlateStudio from "@/components/plate/PlateStudio";
import { decodeParams } from "@/components/plate/params";

export const metadata: Metadata = {
  title: "Experiments | Tanvesh",
  description: "Deterministic visual experiments with live mathematical controls.",
};

export default async function ExperimentsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // The plate lives in the URL. Reading it here means a shared link renders correctly on
  // the first paint, with no client-side restore step.
  const resolved = await searchParams;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(resolved)) {
    if (typeof value === "string") query.set(key, value);
  }

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
      </nav>
      <PlateStudio initial={decodeParams(query)} />
    </div>
  );
}
