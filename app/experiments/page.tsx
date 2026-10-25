import type { Metadata } from "next";
import Link from "next/link";
import PlateStudio from "@/components/plate/PlateStudio";
// DialKit's own stylesheet, with its remote font import stripped so the panel uses the
// site's locally served Geist Mono instead of a render-blocking Google Fonts request.
import "@/app/dialkit.css";

export const metadata: Metadata = {
  title: "Experiments | Tanvesh",
  description: "Deterministic visual experiments with live mathematical controls.",
};

export default function ExperimentsPage() {
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
      <PlateStudio />
    </div>
  );
}
