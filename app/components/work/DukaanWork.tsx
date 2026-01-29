"use client";

import { GridPattern } from "@/components/ui/grid-pattern";
import { AutoplayVideo } from "@/components/ui/autoplay-video";
import { MorphSurface } from "@/components/ui/morph-surface";

export default function DukaanWork() {
  return (
    <div className="relative">
      <GridPattern
        variant="l-shaped"
        className="fill-blue-500/50 stroke-blue-500/50"
        opacity={0.7}
      />
      {/* <MountainPattern opacity={0.5} /> */}
      <div className="relative z-10 space-y-4 border border-primary-border p-4 flex flex-col justify-between md:gap-8">
        <div className="relative p-6 border border-primary-border shadow-lg bg-yellow-100 flex-shrink-0 w-full">
          <GridPattern
            variant="diagonal"
            className="text-blue-500/80"
            opacity={0.15}
          />

          <AutoplayVideo
            src="/followalice.mp4"
            containerClassName="relative z-10 aspect-video w-full overflow-hidden"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div>
            <h3 className="font-departure text-3xl uppercase text-primary">
              My Dukaan{" "}
              <span className="font-mono text-sm text-neutral-600 uppercase">
                MAR 2022 - SEP 2022
              </span>
            </h3>
            <p className="font-mono text text-black uppercase">Engineer</p>
          </div>

          <p className="font-mono text-lg text-neutral-700  mt-6">
            A startup building no-code commerce tools for India&apos;s 100+
            million small businesses, from neighborhood shops to restaurants,
            enabling them to set up digital presence and accept payments.
          </p>

          <h4 className="font-mono text-sm uppercase text-black mt-6">
            WHAT I LEARNT
          </h4>
          <p className="font-mono text-neutral-700 text-lg mt-2">
            How to ship fast, iterate based on user feedback, and build with
            limited resources while maintaining quality.
          </p>

          <h4 className="font-mono text-sm uppercase text-neutral-600 mt-6">
            NOTABLE WORK
          </h4>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            <a
              href="#self-checkout"
              className="text-primary underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-primary font-mono text-sm"
            >
              Self checkout system
            </a>
            <a
              href="#public-website"
              className="text-primary underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-primary font-mono text-sm"
            >
              Public Website
            </a>
            <a
              href="#ai-workflows"
              className="text-primary underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-primary font-mono text-sm"
            >
              Experiments around AI workflows
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
