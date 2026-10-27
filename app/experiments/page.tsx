import type { Metadata } from "next";
import Image from "next/image";
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
    <div className="min-h-screen bg-white">
      <nav
        aria-label="Primary"
        className="flex items-baseline gap-6 px-4 py-6 font-mono uppercase md:px-8"
      >
        <Link href="/" className="text-neutral-900 transition-colors hover:text-primary">
          Tanvesh
        </Link>
        <span className="text-primary">Experiments</span>
      </nav>
      <PlateStudio initial={decodeParams(query)}>
        <section aria-labelledby="source-heading" className="mt-4 border-t border-neutral-200 pt-4">
          <figure className="m-0 max-w-[200px]">
            <Image
              src="/scans/barton1978.jpg"
              alt="Barton Brands annual report cover, 1978: three horizontal bands of dots on flat orange, with the title reversed out at the top."
              width={848}
              height={1243}
              sizes="200px"
              className="block h-auto w-full bg-white ring-1 ring-black/10"
            />
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
              Source scan · 848 × 1243
            </figcaption>
          </figure>

          <div className="mt-4">
            <h2
              id="source-heading"
              className="font-departure text-primary text-base font-bold uppercase"
            >
              The cover this came from
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-neutral-800">
              Barton Brands, <em>Report &amp; Accounts</em>, 1978. Three horizontal waves
              of dots across flat orange, the title reversed out at the head. Scanned
              from the Internet Archive&rsquo;s Annual Reports collection.
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-600">
              The plate above is not a copy of this cover. It is the same idea rebuilt as
              a function: a scalar field contoured into lines, sampled into bands of
              marks, then mirrored on its vertical axis. Every number in the panel feeds
              that function, so the same numbers always give the same plate.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-wider">
              <div>
                <dt className="text-neutral-500">Company</dt>
                <dd className="mt-0.5 text-neutral-900">Barton Brands</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Year</dt>
                <dd className="mt-0.5 text-neutral-900">1978</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Collection</dt>
                <dd className="mt-0.5 text-neutral-900">Annual Reports Archive</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Ink / paper</dt>
                <dd className="mt-0.5 text-neutral-900">#003898 / #B3B7CD</dd>
              </div>
            </dl>
            <a
              href="https://annualreport.gallery/#bartonbrandsltdannualreports__bartonbrands1978"
              target="_blank"
              rel="noreferrer"
              className="font-departure text-primary mt-6 inline-block text-sm uppercase underline transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-black"
            >
              View in the archive
            </a>
          </div>
        </section>
      </PlateStudio>
    </div>
  );
}
