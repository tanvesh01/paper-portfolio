"use client";

import Image from "next/image";
import { GridPattern } from "@/components/ui/grid-pattern";
import { AutoplayVideo } from "@/components/ui/autoplay-video";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { CarouselWithArrows } from "@/components/ui/carousel-with-arrows";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="focus:bg-primary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <h1 className="sr-only">Tanvesh - Engineer and Designer</h1>

      <div className="selection:bg-primary relative bg-white selection:text-white">
        <section className="mx-auto flex w-full max-w-7xl flex-col px-8 pt-12 md:border md:px-12 md:pt-24">
          <div className="w-full max-w-4xl">
            <div className="mb-12 flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-neutral-200">
                <Image
                  src="/profile-picture.png"
                  alt="Tanvesh profile picture"
                  fill
                  className="object-cover"
                  sizes="56px"
                  priority
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-primary font-departure text-2xl font-bold uppercase">
                  Tanvesh
                </h2>
                <div className="font-departure z-50 w-fit overflow-hidden border border-dotted border-yellow-300 bg-yellow-100 px-1 text-xs text-black uppercase">
                  is looking for work!
                </div>
              </div>
            </div>
            <main
              id="main"
              className="mt-4 mb-4 flex flex-col gap-4 font-sans text-neutral-800 md:max-w-3/5"
            >
              <p className="text-sm md:text-base">
                I&apos;m an engineer and designer. I build software with a
                strong focus on aesthetics and how things work. I&apos;m
                interested in the craft behind everything.
              </p>

              <p className="text-sm md:text-base">
                I run ultra marathons and I&apos;m training to become a
                professional athlete. <br /> I take photographs and explore
                visual culture.
              </p>

              <p className="text-sm md:text-base">
                Currently based in Bengaluru, working remotely and traveling
                through Southeast Asia when I can.
              </p>
            </main>

            <a
              href="#contact"
              className="bg-primary hover:bg-primary/90 font-departure relative mt-4 inline-flex w-fit items-center gap-2 border-black px-6 py-3 text-sm text-white uppercase transition-colors md:border-b-0"
            >
              <GridPattern />
              Get in touch
            </a>
          </div>
        </section>

        <div className="w-full">
          <div className="relative">
            <div className="mx-auto max-w-7xl border p-8 md:mt-4 md:pl-12">
              <div className="space-y-8 pt-12 md:pt-24">
                <div>
                  <h2 className="text-primary font-departure text-2xl font-bold uppercase">
                    Work
                  </h2>
                  {/*<p className="font-mono text-sm text-neutral-600 uppercase">
                    Places I&apos;ve been, things I&apos;ve learnt
                  </p>*/}
                </div>
                <div className="mt-12 space-y-24">
                  <div className="space-y-4">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-baseline md:gap-12">
                        <a
                          href="https://followalice.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="decoration-primary underline decoration-dotted underline-offset-2 transition-opacity hover:opacity-70"
                        >
                          <h3 className="text-primary font-mono text-xl uppercase md:w-sm">
                            Followalice
                          </h3>
                        </a>
                        <span className="font-mono text-sm text-neutral-600 uppercase">
                          OCT 2022 - PRESENT
                        </span>
                      </div>

                      <p className="font-mono text-sm text-black uppercase">
                        Engineer + Design{" "}
                      </p>
                      <div className="mt-6 flex flex-col gap-12 md:flex-row">
                        <p className="font-sans text-sm text-neutral-800 md:w-sm">
                          A boutique adventure operator running small-group
                          expeditions to Kilimanjaro, Everest Base Camp, and
                          safaris across East Africa.
                        </p>
                        <p className="max-w-md font-sans text-sm text-neutral-600">
                          Built the self-checkout experience, covering trip
                          selection, payments, and post-booking dashboards.
                          Currently working on a back office app to help on
                          ground and remote teams operate more efficiently.
                        </p>
                      </div>
                    </div>
                    <CarouselWithArrows className="mt-12">
                      <AutoplayVideo
                        src="/followalice.mp4"
                        containerClassName="relative shadow-md aspect-[4/3] w-[340px] min-w-[340px] flex-shrink-0  lg:max-w-[360px] overflow-hidden border border-neutral-200 bg-yellow-100 snap-start"
                        className="h-full w-full object-cover"
                      />
                      <div className="relative aspect-[4/3] w-[340px] min-w-[340px] flex-shrink-0 snap-start overflow-hidden border border-neutral-100 shadow-md hover:border-neutral-300">
                        <SimpleTooltip content="Designed and Built a self-checkout system">
                          <Image
                            src="/self-checkout-fa.png"
                            alt="Field notes image 2"
                            fill
                            className="object-cover"
                            quality={100}
                            sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                          />
                        </SimpleTooltip>
                      </div>
                      <div className="hover:border-neutral- relative aspect-[4/3] w-[340px] min-w-[340px] flex-shrink-0 snap-start overflow-hidden border border-neutral-100 shadow-md">
                        <SimpleTooltip content="Hiking to Everest Base camp with Followalice on ground sherpas">
                          <Image
                            src="/nepal-fa.jpg"
                            alt="Walking in Nepal"
                            fill
                            className="object-cover"
                            quality={100}
                            sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                          />
                        </SimpleTooltip>
                      </div>
                    </CarouselWithArrows>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-baseline md:gap-12">
                        <a
                          href="https://neroeditor.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="decoration-primary underline decoration-dotted underline-offset-2 transition-opacity hover:opacity-70"
                        >
                          <h3 className="text-primary font-mono text-lg uppercase md:w-sm">
                            Nero Editor
                          </h3>
                        </a>
                        <span className="font-mono text-sm text-neutral-600 uppercase">
                          2025
                        </span>
                      </div>
                      <p className="font-mono text-sm text-black uppercase">
                        Creator
                      </p>
                      <div className="mt-6 flex flex-col gap-12 pb-4 md:flex-row">
                        <p className="font-sans text-sm text-neutral-800 md:w-sm">
                          An infinite canvas for black and white image
                          exploration.
                        </p>
                        <p className="max-w-md font-sans text-sm text-neutral-600">
                          Nero converts color images in real time using
                          GPU-accelerated luminance mapping, with expressive
                          effects like dithering and paper texture overlays.
                        </p>
                      </div>
                    </div>
                    <CarouselWithArrows className="mt-8">
                      <div className="relative aspect-[4/3] w-[340px] min-w-[340px] flex-shrink-0 snap-start overflow-hidden rounded-md border border-neutral-100 bg-white/80">
                        <SimpleTooltip content="Nero gets out of your way">
                          <Image
                            src="/nero-canvas.png"
                            alt="Nero canvas UI showing infinite workspace"
                            fill
                            className="object-cover"
                            quality={90}
                            sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                          />
                        </SimpleTooltip>
                      </div>
                      <div className="relative aspect-[4/3] w-[340px] min-w-[340px] flex-shrink-0 snap-start overflow-hidden rounded-md border border-neutral-100 bg-white/80">
                        <SimpleTooltip content="Straight out of Nero. Picture taken by me in Nepal">
                          <Image
                            src="/nero-export.png"
                            alt="Nero export options"
                            fill
                            className="object-cover"
                            quality={90}
                            sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                          />
                        </SimpleTooltip>
                      </div>
                      <div className="relative aspect-[4/3] w-[340px] min-w-[340px] flex-shrink-0 snap-start overflow-hidden rounded-md border border-neutral-100 bg-white/80">
                        <SimpleTooltip content="Fine grained controls for every image">
                          <Image
                            src="/nero-panel.png"
                            alt="Nero control panel"
                            fill
                            className="object-cover"
                            quality={90}
                            sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                          />
                        </SimpleTooltip>
                      </div>
                    </CarouselWithArrows>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-baseline md:gap-12">
                        <a
                          href="https://www.tickadoo.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="decoration-primary underline decoration-dotted underline-offset-2 transition-opacity hover:opacity-70"
                        >
                          <h3 className="text-primary font-mono text-xl uppercase md:w-sm">
                            Tickadoo
                          </h3>
                        </a>
                        <span className="font-mono text-sm text-neutral-600 uppercase">
                          2024
                        </span>
                      </div>

                      <p className="font-mono text-sm text-black uppercase">
                        Contractual work
                      </p>
                      <div className="flex flex-col gap-12 pb-4 md:flex-row">
                        <p className="mt-4 font-sans text-sm text-neutral-800 md:w-sm">
                          Map-based experiences for global event discovery.
                        </p>
                        <p className="mt-4 max-w-md font-sans text-sm text-neutral-600">
                          Worked on interactive maps used to browse and discover
                          events across cities, with a focus on performance,
                          usability, and handling location-based data at scale.
                        </p>
                      </div>
                    </div>
                    <CarouselWithArrows className="mt-8">
                      <div className="relative aspect-[4/3] w-[340px] min-w-[340px] flex-shrink-0 snap-start overflow-hidden rounded-md border border-neutral-100 bg-white/80">
                        <Image
                          src="/tickadoo-top.png"
                          alt="Tickadoo map experience"
                          fill
                          className="object-cover"
                          quality={90}
                          sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                        />
                      </div>
                      <div className="relative aspect-[4/3] w-[340px] min-w-[340px] flex-shrink-0 snap-start overflow-hidden rounded-md border border-neutral-100 bg-white/80">
                        <Image
                          src="/tickadoo-bottom.png"
                          alt="Tickadoo event discovery interface"
                          fill
                          className="object-cover"
                          quality={90}
                          sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                        />
                      </div>
                    </CarouselWithArrows>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-baseline md:gap-12">
                        <a
                          href="https://shundo.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="decoration-primary underline decoration-dotted underline-offset-2 transition-opacity hover:opacity-70"
                        >
                          <h3 className="text-primary font-mono text-lg uppercase md:w-sm">
                            Shundo
                          </h3>
                        </a>
                        <span className="font-mono text-sm text-neutral-600 uppercase">
                          2023
                        </span>
                      </div>
                      <p className="font-mono text-sm text-black uppercase">
                        Creator
                      </p>
                      <div className="flex flex-col gap-12 pb-4 md:flex-row">
                        <p className="mt-4 font-sans text-sm text-neutral-800 md:w-sm">
                          A productivity app built for Windows with a strong
                          focus on speed and keyboard-first workflows.
                        </p>
                        <p className="mt-4 max-w-md font-sans text-sm text-neutral-600">
                          Shundo includes lightning-fast file search, a natural
                          language calculator for quick conversions, and instant
                          access to recent VS Code projects. Built using Tauri
                          and Rust with an emphasis on performance and low
                          system overhead.
                        </p>
                      </div>
                    </div>
                    <CarouselWithArrows className="mt-8">
                      <div className="border-primary-border relative aspect-video w-[85vw] min-w-[85vw] flex-shrink-0 snap-start overflow-hidden rounded-md border bg-white/80 md:w-[400px] md:min-w-[400px]">
                        <Image
                          src="/shundo-cover.png"
                          alt="Travel studies image 1"
                          fill
                          className="object-cover"
                          quality={90}
                          sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                        />
                      </div>
                      <div className="border-primary-border relative aspect-[4/3] w-[75vw] min-w-[75vw] flex-shrink-0 snap-start overflow-hidden rounded-md border bg-white/80 md:w-[340px] md:min-w-[340px]">
                        <Image
                          src="/shundo-bento.png"
                          alt="Travel studies image 2"
                          fill
                          className="object-cover"
                          quality={90}
                          sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 80vw"
                        />
                      </div>
                    </CarouselWithArrows>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-baseline md:gap-12">
                        <a
                          href="https://mydukaan.io/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="decoration-primary underline decoration-dotted underline-offset-2 transition-opacity hover:opacity-70"
                        >
                          <h3 className="text-primary font-mono text-xl uppercase md:w-sm">
                            myDukaan
                          </h3>
                        </a>
                        <span className="font-mono text-sm text-neutral-600 uppercase">
                          March 2022 - Sep 2022
                        </span>
                      </div>

                      <p className="font-mono text-sm text-black uppercase">
                        Engineer
                      </p>
                      <div className="flex flex-col gap-12 pb-4 md:flex-row">
                        <p className="mt-4 font-sans text-sm text-neutral-800 md:w-sm">
                          A no-code commerce platform helping India&apos;s 100+
                          million small businesses build an online presence and
                          accept payments.
                        </p>
                        <p className="mt-4 max-w-md font-sans text-sm text-neutral-600">
                          Worked on the seller dashboard with a focus on
                          payments and delivery workflows. Led internal dev
                          tooling work to improve build times by around 80%
                          across the codebase.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-baseline md:gap-12">
                        <a
                          href="https://wrky.ai/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="decoration-primary underline decoration-dotted underline-offset-4 transition-opacity hover:opacity-70"
                        >
                          <h3 className="text-primary font-mono text-xl uppercase md:w-sm">
                            Wrky.ai
                          </h3>
                        </a>
                        <span className="font-mono text-sm text-neutral-600 uppercase">
                          OCT 2020 - MAR 2022
                        </span>
                      </div>

                      <p className="font-mono text-sm text-black uppercase">
                        Frontend Engineer
                      </p>
                      <div className="flex flex-col gap-12 pb-4 md:flex-row">
                        <p className="mt-4 font-sans text-sm text-neutral-800 md:w-sm">
                          Built a web app from scratch for assessment workflows,
                          used by thousands of candidates and HR teams to manage
                          hiring pipelines end to end.
                        </p>
                        <p className="mt-4 max-w-md font-sans text-sm text-neutral-600">
                          Built with Next.js and TypeScript, with GraphQL Code
                          Generator and React Query for type-safe frontend and
                          backend integration. Implemented server-side
                          prefetching to eliminate first-load waiting states,
                          and built a reusable component library with a design
                          system using Stitches to speed up delivery of new
                          pages.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer id="contact" className="font-departure mt-24 bg-white py-12">
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <div className="mb-4 flex flex-col gap-1">
              <div className="z-50 w-fit overflow-hidden border border-dotted border-yellow-300 bg-yellow-100 px-1 text-xs text-black">
                SEE SOME OF MY OPEN SOURCE WORK HERE!
              </div>
              <a
                href="https://github.com/tanvesh01"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary text-black underline transition-colors"
              >
                GitHub
              </a>
            </div>
            <div className="mb-4 flex flex-col gap-1">
              <div className="z-50 w-fit overflow-hidden border border-dotted border-yellow-300 bg-yellow-100 px-1 text-xs text-black uppercase">
                I also write opinions on twitter
              </div>
              <a
                href="https://x.com/Sarve___tanvesh"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary text-black underline transition-colors"
              >
                Twitter
              </a>
            </div>
            <div className="mb-4 flex flex-col gap-1">
              <div className="z-50 w-fit overflow-hidden border border-dotted border-yellow-300 bg-yellow-100 px-1 text-xs text-black uppercase">
                Book a call with me :)
              </div>
              <a
                href="https://cal.com/tanvesh01"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary text-black underline transition-colors"
              >
                Calendly
              </a>
            </div>
            <div className="mb-4 flex flex-col gap-1">
              <div className="z-50 w-fit overflow-hidden border border-dotted border-yellow-300 bg-yellow-100 px-1 text-xs text-black uppercase">
                Here's my resume, if you are into that
              </div>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary text-black underline transition-colors"
              >
                Resume
              </a>
            </div>
            <div className="mb-4 flex flex-col gap-1">
              <div className="z-50 w-fit overflow-hidden border border-dotted border-yellow-300 bg-yellow-100 px-1 text-xs text-black uppercase">
                Reach out if I can help with anything. I am looking for work!
              </div>
              <a
                href="mailto:sarvetanvesh01@gmail.com"
                className="hover:text-primary text-black underline transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
