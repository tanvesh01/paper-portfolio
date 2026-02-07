interface LeftSpectrumProps {
  className?: string;
  barCount?: number;
  minLength?: number;
  maxLength?: number;
}

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export function LeftSpectrum({
  className = "",
  barCount = 140,
  minLength = 10,
  maxLength = 96,
}: LeftSpectrumProps) {
  const bars = Array.from({ length: barCount }, (_, index) => {
    const waveA = (Math.sin(index * 0.23) + 1) / 2;
    const waveB = (Math.sin(index * 0.07 + 1.9) + 1) / 2;
    const waveC = (Math.sin(index * 0.013 + 0.6) + 1) / 2;
    const spike =
      index % 31 === 0
        ? 1
        : index % 19 === 0
          ? 0.65
          : index % 11 === 0
            ? 0.4
            : 0;
    const mix = clamp(waveA * 0.55 + waveB * 0.3 + waveC * 0.15 + spike * 0.45);
    const length = minLength + mix * (maxLength - minLength);
    return {
      length,
      accent: index % 23 === 0 || index % 41 === 0,
      thickness: index % 9 === 0 ? 2 : 1,
    };
  });

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 left-0 h-full w-24 overflow-hidden sm:w-28 md:w-32 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/40 to-transparent" />
      <div className="relative flex h-full flex-col gap-1 py-6 pr-3 pl-2">
        {bars.map((bar, index) => (
          <div
            key={`${bar.length}-${index}`}
            className={`rounded-full ${
              bar.accent ? "bg-[#ff6a00]" : "bg-white/85"
            }`}
            style={{
              width: `${bar.length}px`,
              height: `${bar.thickness}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
