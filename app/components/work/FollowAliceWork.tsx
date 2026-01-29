"use client";

import { GridPattern } from "@/components/ui/grid-pattern";
import { AutoplayVideo } from "@/components/ui/autoplay-video";

export default function FollowAliceWork() {
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
              FOLLOWALICE{" "}
              <span className="font-mono text-sm text-neutral-600 uppercase">
                OCT 2022 - PRESENT
              </span>
            </h3>
            <p className="font-mono text text-black uppercase">
              Engineer + Design
            </p>
          </div>

          <p className="font-mono text-lg text-neutral-700  mt-6">
            A boutique adventure operator running small-group trips to places
            like Kilimanjaro, Everest Base Camp, and safaris across East Africa.
          </p>

          <h4 className="font-mono text-sm uppercase text-black mt-6">
            WHAT I LEARNT
          </h4>
          <p className="font-mono text-neutral-700 text-lg mt-2">
            How to test quietly before shipping, how to break things less, and
            how to set up systems around me so I naturally make fewer mistakes.
          </p>

          <div className="flex flex-wrap my-2">
            <button className="font-sans cursor-pointer hidden  bg-primary/80 backdrop-blur-xs shadow-[0px_5px_0px_rgba(0,0,0,0.1)] px-4 py-1 rounded-md shadow-primary text-white text-sm mt-2 hover:bg-primary transition-colors">
              Some Notable work @followalice
              <GridPattern
                variant="diagonal"
                className="text-white"
                opacity={0.15}
              />
            </button>
            <button className="font-sans cursor-pointer relative flex items-center gap-2 text-primary bg-transparent border border-neutral-200 shadow-[0px_5px_0px_rgba(0,0,0,0.1)] px-4 pl-3 py-1 rounded-md shadow-neutral-200 text-sm mt-2 hover:bg-neutral-200/30 transition-colors">
              <span className="block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
                  />
                </svg>
              </span>
              Some Notable work @followalice
              <GridPattern
                variant="diagonal"
                className="text-primary"
                opacity={0.15}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
