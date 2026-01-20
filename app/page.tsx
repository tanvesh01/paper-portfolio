'use client';

import Image from "next/image";
import { useRef } from "react";
import { AsciiCursorEffect } from "@/components/ascii-cursor-effect";
import { GridPattern } from "@/components/ui/grid-pattern";

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

          <main id="main" className="relative z-10 pt-72 font-departure text-white uppercase flex flex-col gap-4 max-w-3xl mx-auto text-xl [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)]">
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
        <div className="border border-primary-border w-full">
          <div className="border border-primary-border border-y-0 p-4 max-w-[80%] mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="uppercase font-departure text-2xl text-primary">
                  Work
                </h2>
                <p className="font-mono text-neutral-600 text-sm uppercase">
                  Places I&apos;ve been, things I&apos;ve learnt
                </p>
              </div>

              <div className="relative p-6 space-y-4">
                <GridPattern
                  variant="l-shaped"
                  className="fill-blue-500/50 stroke-blue-500/50"
                  opacity={0.15}
                />
                <div className="relative z-10 space-y-4">
                  <div>
                    <h3 className="font-departure text-2xl uppercase text-primary">
                      FOLLOWALICE
                    </h3>
                    <p className="font-mono text-sm text-neutral-600 uppercase">
                      OCT 2022 - PRESENT
                    </p>
                  </div>

                  <p className="font-sans text-base text-neutral-700 leading-relaxed">
                    A Travel company that runs small-group, guided adventure trips and treks to epic destinations around the world.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-mono text-xs uppercase tracking-wide text-neutral-500">
                      WHAT I LEARNT
                    </h4>
                    <p className="font-sans text-sm text-neutral-700">
                      How to test quietly first before shipping code, how to break things less, how to set systems around you so that you make less mistakes.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-mono text-xs uppercase tracking-wide text-neutral-500">
                      NOTABLE WORK
                    </h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <a
                        href="#self-checkout"
                        className="text-primary hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-primary font-mono text-sm"
                      >
                        Self checkout system
                      </a>
                      <a
                        href="#public-website"
                        className="text-primary hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-primary font-mono text-sm"
                      >
                        Public Website
                      </a>
                      <a
                        href="#ai-workflows"
                        className="text-primary hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-primary font-mono text-sm"
                      >
                        Experiments around AI workflows
                      </a>
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
