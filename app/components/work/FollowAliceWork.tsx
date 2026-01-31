"use client";

import Image from "next/image";

import { GridPattern } from "@/components/ui/grid-pattern";
import { AutoplayVideo } from "@/components/ui/autoplay-video";
import { Tooltip } from "@/components/ui/tooltip";

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

          <p className="font-mono text-neutral-700 mt-6">
            A boutique adventure operator running small-group trips to places
            like Kilimanjaro, Everest Base Camp, and safaris across East Africa.
          </p>

          {/*<h4 className="font-mono text-sm uppercase text-black mt-6">
            WHAT I LEARNT
          </h4>
          <p className="font-mono text-neutral-700 mt-2">
            How to test quietly before shipping, how to break things less, and
            how to set up systems around me so I naturally make fewer mistakes.
          </p>*/}

          <div className="flex flex-wrap my-2 relative">
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              <Tooltip
                content={
                  <>
                    <p className="font-departure text-sm max-w-xs uppercase">
                      Built all of Self checkout feauture. From checkout to
                      Payments and then to Dashboards
                    </p>
                    <div className="mt-3">
                      <Image
                        src="/self-checkout-fa.png"
                        alt="FollowAlice self-checkout flow"
                        width={1280}
                        height={960}
                        loading="lazy"
                        className="w-full max-w-xs rounded-md border border-black/10 shadow-sm"
                      />
                    </div>
                  </>
                }
                side="top"
                align="center"
                delayDuration={100}
              >
                <a
                  href="#self-checkout"
                  className="text-primary underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-primary font-mono text-sm"
                >
                  Self checkout system
                </a>
              </Tooltip>
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
    </div>
  );
}
