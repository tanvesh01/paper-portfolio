import Image from "next/image";

export default function Home() {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-20 p-6 flex">
        <p className="font-mono text-white font-medium uppercase">Tanvesh</p>
      </nav>
      <div className="relative min-h-[200vh] bg-white  selection:bg-primary selection:text-white">
        <section className="relative h-[120vh] w-full flex flex-col  overflow-hidden text-white">
          <div className="absolute inset-0 -top-20   z-0 h-full">
            <Image
              src="/frame-52.png"
              alt="Background ambience"
              fill
              className="object-cover "
              priority
              quality={100}
              sizes="100vw"
            />
            <div className="absolute  bg-linear-to-t from-white to-transparent z-5 h-80 bottom-0 w-full flex flex-col justify-end text-primary font-mono items-center uppercase">
              <p>Mt. Thamserku, Nepal</p>
              <p>27.79028°N 86.78750°E</p>
            </div>
          </div>

          <main className="relative z-10 pt-72 font-departure text-white uppercase flex flex-col gap-4 max-w-3xl mx-auto text-xl">
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
          <svg className="pointer-events-none absolute inset-0 size-full select-none text-blue-500/80   group-aria-selected:block opacity-[.15]">
            <defs>
              <pattern
                id=":Se:"
                width="4"
                height="4"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="4"
                  stroke="currentColor"
                  stroke-width="1.5"
                ></line>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#:Se:)"></rect>
          </svg>
        </div>
        <div className="border border-primary-border w-full ">
          <div className="h-96 border border-primary-border border-y-0 p-4 max-w-4/5 mx-auto relative">
            <div className="absolute inset-0 [z-index:1]">
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 [z-index:-1] size-full fill-blue-500/50 stroke-blue-500/50 opacity-[.15]"
              >
                <defs>
                  <pattern
                    id=":rl:"
                    width="12"
                    height="12"
                    patternUnits="userSpaceOnUse"
                    x="-1"
                    y="-1"
                  >
                    <path
                      d="M.5 12V.5H12"
                      fill="none"
                      stroke-dasharray="0"
                    ></path>
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  stroke-width="0"
                  fill="url(#:rl:)"
                ></rect>
              </svg>
            </div>
            <h2 className="uppercase font-departure text-2xl text-primary">
              Work
            </h2>
            <p className="font-mono  text-neutral-600 text-sm uppercase">
              Places I&apos;ve been, things I&apos;ve learnt
            </p>

            <div>
              <h4>Followalice</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
