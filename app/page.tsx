"use client";

import Image from "next/image";
import { useRef } from "react";
import { AsciiCursorEffect } from "@/components/ascii-cursor-effect";
import { GridPattern } from "@/components/ui/grid-pattern";
import { MountainPattern } from "@/components/ui/mountain-pattern";
import FollowAliceWork from "@/app/components/work/FollowAliceWork";
import DukaanWork from "./components/work/DukaanWork";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { MorphSurface } from "@/components/ui/morph-surface";
import { AutoplayVideo } from "@/components/ui/autoplay-video";
import { Tooltip } from "@/components/ui/tooltip";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded"
      >
        Skip to content
      </a>
      <h1 className="sr-only">Tanvesh - Engineer and Designer</h1>
      <nav className="fixed top-0 left-0 w-full z-20 p-6 flex">
        <p className="font-mono text-white font-medium uppercase">Tanvesh</p>
        <a
          href="/blog"
          className="font-mono text-white font-medium uppercase hover:text-primary transition-colors"
        >
          Writing
        </a>
      </nav>
      <div className="relative min-h-[200vh] bg-white  selection:bg-primary selection:text-white">
        <section className="relative h-[120vh] w-full flex flex-col  overflow-hidden text-white">
          <div ref={heroRef} className="absolute inset-0 -top-20   z-0 h-full">
            <Image
              src="/frame-52.png"
              alt="Mountain landscape of Mt. Thamserku in Nepal with snow-capped peaks"
              fill
              className="object-cover"
              priority
              quality={100}
              sizes="100vw"
            />
            <AsciiCursorEffect
              imageUrl="/frame-52.png"
              containerRef={heroRef}
              radius={125}
              gridSize={14}
            />
            <div className="absolute bg-gradient-to-t from-white to-transparent z-5 h-80 bottom-0 w-full flex flex-col justify-end text-primary font-mono items-center uppercase">
              <p>Mt. Thamserku, Nepal</p>
              <p>27.79028°N 86.78750°E</p>
            </div>
          </div>

          <main
            id="main"
            className="relative z-10 pt-72 font-departure text-white uppercase flex flex-col gap-4 max-w-3xl mx-auto text-xl [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)]"
          >
            <p>
              I&apos;m an engineer and designer. I build software with a strong
              focus on aesthetics and how things work. I&apos;m interested in
              the craft behind everything. <br />
            </p>

            <p>
              I run ultra marathons and I&apos;m training to become a
              professional athlete. I take photographs and explore visual
              culture.
            </p>

            <p>
              Currently based in Bengaluru, working remotely and traveling
              through Southeast Asia when I can.
            </p>
          </main>
        </section>
        <div className="h-40 relative ">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-white/0 z-10 h-40"></div>
          <GridPattern
            variant="diagonal"
            className="text-blue-500/80"
            opacity={0.15}
          />
        </div>
        <div className=" w-full ">
          <div className=" p-4 max-w-[80%] mx-auto md:shadow-[0px_1px_4px_1px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(0,0,0,0.50),0px_-1px_1px_1px_#FFF_inset]">
            <div className="space-y-8">
              <div>
                <h2 className="uppercase font-departure text-2xl text-primary">
                  Work
                </h2>
                <p className="font-mono text-neutral-600 text-sm uppercase">
                  Places I&apos;ve been, things I&apos;ve learnt
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FollowAliceWork />
                <DukaanWork />
              </div>
            </div>
            <div className="space-y-8 pt-10 border-t border-primary-border">
              <div>
                <h2 className="uppercase font-departure text-3xl text-primary">
                  Work
                </h2>
                <p className="font-mono text-neutral-600 text-sm uppercase">
                  Places I{"'"}ve been, things I{"'"}ve learnt
                </p>
              </div>
              <div className="space-y-10 mt-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="uppercase font-departure text-xl text-primary">
                      Followalice{" "}
                      <span className="font-mono text-sm text-neutral-600 uppercase">
                        OCT 2022 - PRESENT
                      </span>
                    </h3>

                    <p className="font-mono text-sm text-black uppercase">
                      Engineer + Design
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                      <p className="font-sans text-neutral-800 text-sm max-w-md mt-4">
                        <span className="font-ibm-plex-serif"> A </span>{" "}
                        boutique adventure operator running small-group
                        expeditions to Kilimanjaro, Everest Base Camp, and
                        safaris across East Africa.
                      </p>
                      <p className="font-sans text-neutral-600 text-sm max-w-md mt-4">
                        Built the end-to-end self-checkout experience, covering
                        trip selection, payments, and post-booking dashboards.
                        Designed and implemented an Airbnb-inspired self-booking
                        flow for trips. Currently working on a back-office app
                        to help on-ground and remote teams operate more
                        efficiently.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 overflow-x-auto md:flex-nowrap pb-2 md:pb-0 snap-x snap-mandatory scrollbar-hide">
                    <AutoplayVideo
                      src="/followalice.mp4"
                      containerClassName="relative shadow-md aspect-[4/3] w-[280px] min-w-[280px] flex-shrink-0 md:w-auto md:min-w-0 md:flex-1 md:max-w-[360px] overflow-hidden border border-neutral-200 bg-yellow-100 snap-start"
                      className="h-full w-full object-cover"
                    />
                    <div className="relative shadow-md aspect-[4/3] w-[280px] min-w-[280px] flex-shrink-0 md:w-auto md:min-w-0 md:flex-1 md:max-w-[360px] overflow-hidden border border-neutral-100 hover:border-neutral-300 snap-start">
                      <Tooltip
                        content={
                          <p className="font-departure uppercase text-xs max-w-xs">
                            Designed and Built a self-checkout system
                          </p>
                        }
                        side="top"
                        align="center"
                        delayDuration={100}
                      >
                        <Image
                          src="/self-checkout-fa.png"
                          alt="Field notes image 2"
                          fill
                          className="object-cover"
                          quality={100}
                          sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                        />
                      </Tooltip>
                    </div>
                    <div className="relative shadow-md aspect-[4/3] w-[280px] min-w-[280px] flex-shrink-0 md:w-auto md:min-w-0 md:flex-1 md:max-w-[360px] overflow-hidden border border-neutral-100 hover:border-neutral- snap-start">
                      <Tooltip
                        content={
                          <p className="font-departure uppercase text-xs ">
                            Hiking to Everest Base camp with Followalice on
                            ground sherpas
                          </p>
                        }
                        side="top"
                        align="center"
                        delayDuration={100}
                      >
                        <Image
                          src="/nepal-fa.jpg"
                          alt="Walking in Nepal"
                          fill
                          className="object-cover "
                          quality={100}
                          sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                        />
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="uppercase font-departure text-lg text-primary">
                      Nero
                    </h3>
                    <p className="font-mono text-sm text-black uppercase">
                      Creator
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                      <p className="font-sans text-neutral-800 text-sm max-w-md mt-4">
                        An infinite canvas for black and white image
                        exploration.
                      </p>
                      <p className="font-sans text-neutral-600 text-sm max-w-md mt-4">
                        Nero converts color images in real time using
                        GPU-accelerated luminance mapping, with expressive
                        effects like dithering and paper texture overlays.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 overflow-x-auto md:flex-nowrap pb-2 md:pb-0 snap-x snap-mandatory scrollbar-hide">
                    <div className="relative aspect-[4/3] w-[280px] min-w-[280px] flex-shrink-0 md:w-auto md:min-w-0 md:flex-1 md:max-w-[360px] rounded-md overflow-hidden border border-primary-border bg-white/80 snap-start">
                      <Image
                        src="/nero-canvas.png"
                        alt="Nero canvas UI showing infinite workspace"
                        fill
                        className="object-cover"
                        quality={90}
                        sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                      />
                    </div>
                    <div className="relative aspect-[4/3] w-[280px] min-w-[280px] flex-shrink-0 md:w-auto md:min-w-0 md:flex-1 md:max-w-[360px] rounded-md overflow-hidden border border-primary-border bg-white/80 snap-start">
                      <Image
                        src="/nero-cover.png"
                        alt="Nero cover screen"
                        fill
                        className="object-cover"
                        quality={90}
                        sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                      />
                    </div>
                    <div className="relative aspect-[4/3] w-[280px] min-w-[280px] flex-shrink-0 md:w-auto md:min-w-0 md:flex-1 md:max-w-[360px] rounded-md overflow-hidden border border-primary-border bg-white/80 snap-start">
                      <Image
                        src="/nero-export.png"
                        alt="Nero export options"
                        fill
                        className="object-cover"
                        quality={90}
                        sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                      />
                    </div>
                    <div className="relative aspect-[4/3] w-[280px] min-w-[280px] flex-shrink-0 md:w-auto md:min-w-0 md:flex-1 md:max-w-[360px] rounded-md overflow-hidden border border-primary-border bg-white/80 snap-start">
                      <Image
                        src="/nero-panel.png"
                        alt="Nero control panel"
                        fill
                        className="object-cover"
                        quality={90}
                        sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="uppercase font-departure text-lg text-primary">
                      Travel Studies
                    </h3>
                    <p className="font-mono text-neutral-600 text-sm uppercase">
                      Light, texture, and pace across new terrain.
                    </p>
                  </div>
                  <div className="flex gap-4 overflow-x-auto md:flex-nowrap pb-2 md:pb-0 snap-x snap-mandatory scrollbar-hide">
                    <div className="relative aspect-[4/3] w-[280px] min-w-[280px] flex-shrink-0 md:w-auto md:min-w-0 md:flex-1 md:max-w-[360px] rounded-md overflow-hidden border border-primary-border bg-white/80 snap-start">
                      <Image
                        src="/frame-52.png"
                        alt="Travel studies image 1"
                        fill
                        className="object-cover"
                        quality={90}
                        sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                      />
                    </div>
                    <div className="relative aspect-[4/3] w-[280px] min-w-[280px] flex-shrink-0 md:w-auto md:min-w-0 md:flex-1 md:max-w-[360px] rounded-md overflow-hidden border border-primary-border bg-white/80 snap-start">
                      <Image
                        src="/frame-52.png"
                        alt="Travel studies image 2"
                        fill
                        className="object-cover"
                        quality={90}
                        sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                      />
                    </div>
                    <div className="relative aspect-[4/3] w-[280px] min-w-[280px] flex-shrink-0 md:w-auto md:min-w-0 md:flex-1 md:max-w-[360px] rounded-md overflow-hidden border border-primary-border bg-white/80 snap-start">
                      <Image
                        src="/frame-52.png"
                        alt="Travel studies image 3"
                        fill
                        className="object-cover"
                        quality={90}
                        sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="uppercase font-departure text-lg text-primary">
                      Build Journal
                    </h3>
                    <p className="font-mono text-neutral-600 text-sm uppercase">
                      Interfaces, prototypes, and unfinished ideas.
                    </p>
                  </div>
                  <div className="flex gap-4 overflow-x-auto md:flex-nowrap pb-2 md:pb-0 snap-x snap-mandatory scrollbar-hide">
                    <div className="relative aspect-[4/3] w-[280px] min-w-[280px] flex-shrink-0 md:w-auto md:min-w-0 md:flex-1 md:max-w-[360px] rounded-md overflow-hidden border border-primary-border bg-white/80 snap-start">
                      <Image
                        src="/frame-52.png"
                        alt="Build journal image 1"
                        fill
                        className="object-cover"
                        quality={90}
                        sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                      />
                    </div>
                    <div className="relative aspect-[4/3] w-[280px] min-w-[280px] flex-shrink-0 md:w-auto md:min-w-0 md:flex-1 md:max-w-[360px] rounded-md overflow-hidden border border-primary-border bg-white/80 snap-start">
                      <Image
                        src="/frame-52.png"
                        alt="Build journal image 2"
                        fill
                        className="object-cover"
                        quality={90}
                        sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                      />
                    </div>
                    <div className="relative aspect-[4/3] w-[280px] min-w-[280px] flex-shrink-0 md:w-auto md:min-w-0 md:flex-1 md:max-w-[360px] rounded-md overflow-hidden border border-primary-border bg-white/80 snap-start">
                      <Image
                        src="/frame-52.png"
                        alt="Build journal image 3"
                        fill
                        className="object-cover"
                        quality={90}
                        sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
