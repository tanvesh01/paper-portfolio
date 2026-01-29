/**
 * InteractiveCard Component
 * 
 * A reusable card that pops out with spring animations on hover and can be locked
 * in the active state with a click. Features click-outside detection to reset state.
 * Only one card can be active at a time across the entire application.
 * 
 * @example
 * ```tsx
 * import { InteractiveCard } from "@/components/ui/interactive-card";
 * 
 * export default function Page() {
 *   return (
 *     <div className="flex gap-8 items-center justify-center min-h-screen">
 *       <InteractiveCard 
 *         id="card-1"
 *         emoji="🍅" 
 *         hueA={340} 
 *         hueB={10}
 *         onActivate={() => console.log("Card activated!")}
 *         onDeactivate={() => console.log("Card deactivated!")}
 *       />
 *       <InteractiveCard 
 *         id="card-2"
 *         emoji="🍊" 
 *         hueA={20} 
 *         hueB={40}
 *       />
 *     </div>
 *   );
 * }
 * ```
 * 
 * @requires InteractiveCardProvider must wrap your app for global state management
 */

"use client";

import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { useRef } from "react";
import { useInteractiveCard } from "./interactive-card-context";
import { useClickOutside } from "@/hooks/use-click-outside";

export interface InteractiveCardProps {
  /** Unique identifier for this card (required for global state management) */
  id: string;
  /** Emoji or text content to display in the card */
  emoji: string;
  /** Gradient start hue value (0-360) */
  hueA: number;
  /** Gradient end hue value (0-360) */
  hueB: number;
  /** Card width in pixels (default: 300) */
  width?: number;
  /** Card height in pixels (default: 430) */
  height?: number;
  /** Font size for emoji/content (default: 164) */
  fontSize?: number;
  /** Additional CSS classes */
  className?: string;
  /** Callback fired when card is clicked to active state */
  onActivate?: () => void;
  /** Callback fired when card returns to flat state */
  onDeactivate?: () => void;
}

export function InteractiveCard({
  id,
  emoji,
  hueA,
  hueB,
  width = 300,
  height = 430,
  fontSize = 164,
  className = "",
  onActivate,
  onDeactivate,
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { activeCardId, setActiveCard } = useInteractiveCard();
  const isActive = activeCardId === id;

  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  const handleClick = () => {
    if (isActive) {
      // Deactivate this card
      setActiveCard(null);
      onDeactivate?.();
    } else {
      // Activate this card (automatically deactivates any other active card)
      setActiveCard(id);
      onActivate?.();
    }
  };

  // Reset to flat state when clicking outside
  useClickOutside(cardRef, () => {
    if (isActive) {
      setActiveCard(null);
      onDeactivate?.();
    }
  });

  return (
    <motion.div
      ref={cardRef}
      className={`interactive-card-container ${className}`}
      style={{
        ...cardContainer,
        cursor: "pointer",
      }}
      initial="initial"
      animate={isActive ? "active" : "initial"}
      whileHover={isActive ? undefined : "hover"}
      onClick={handleClick}
    >
      <div style={{ ...splash, background }} />
      <motion.div
        style={{
          ...card,
          fontSize,
          width,
          height,
        }}
        variants={cardVariants}
        className="interactive-card"
      >
        {emoji}
      </motion.div>
    </motion.div>
  );
}

/**
 * Animation variants for card pop-out effect
 */
const cardVariants: Variants = {
  initial: {
    y: 0,
    rotate: 0,
  },
  hover: {
    y: -50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
  active: {
    y: -50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

/**
 * Converts hue value to HSL color string
 */
const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

/**
 * ==============   Styles   ================
 */

const cardContainer: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
};

const splash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
};

const card: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  background: "#f5f5f5",
  boxShadow:
    "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "10% 60%",
};
