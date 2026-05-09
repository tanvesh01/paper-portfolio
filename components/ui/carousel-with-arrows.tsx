"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface CarouselWithArrowsProps {
  children: ReactNode;
  className?: string;
}

export function CarouselWithArrows({
  children,
  className = "",
}: CarouselWithArrowsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    const element = scrollRef.current;
    if (!element) return;

    const { scrollLeft, scrollWidth, clientWidth } = element;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    checkScrollPosition();
    element.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      element.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const element = scrollRef.current;
    if (!element) return;

    const scrollAmount = direction === "left" ? -354 : 354;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    element.scrollBy({
      left: scrollAmount,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={scrollRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:flex-nowrap md:pb-0"
      >
        {children}
      </div>

      <button
        onClick={() => scroll("left")}
        className={`absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-[opacity,transform] duration-200 ease-out active:scale-[0.97] before:absolute before:inset-[-12px] before:content-[''] md:hidden ${
          canScrollLeft ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="Scroll left"
      >
        <ChevronLeftIcon className="h-5 w-5 text-neutral-800" />
      </button>

      <button
        onClick={() => scroll("right")}
        className={`absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-[opacity,transform] duration-200 ease-out active:scale-[0.97] before:absolute before:inset-[-12px] before:content-[''] md:hidden ${
          canScrollRight ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="Scroll right"
      >
        <ChevronRightIcon className="h-5 w-5 text-neutral-800" />
      </button>
    </div>
  );
}
