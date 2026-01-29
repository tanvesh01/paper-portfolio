"use client";

import React, { createContext, useContext, useState } from "react";

interface InteractiveCardContextType {
  activeCardId: string | null;
  setActiveCard: (id: string | null) => void;
}

const InteractiveCardContext = createContext<InteractiveCardContextType | undefined>(
  undefined
);

/**
 * Provider component that manages global state for InteractiveCard components.
 * Ensures only one card can be active (popped out) at a time across the entire app.
 * 
 * @example
 * ```tsx
 * import { InteractiveCardProvider } from "@/components/ui/interactive-card-context";
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <InteractiveCardProvider>
 *       {children}
 *     </InteractiveCardProvider>
 *   );
 * }
 * ```
 */
export function InteractiveCardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const setActiveCard = (id: string | null) => {
    setActiveCardId(id);
  };

  return (
    <InteractiveCardContext.Provider value={{ activeCardId, setActiveCard }}>
      {children}
    </InteractiveCardContext.Provider>
  );
}

/**
 * Hook to access the InteractiveCard context.
 * Must be used within an InteractiveCardProvider.
 * 
 * @returns Object containing activeCardId and setActiveCard function
 * @throws Error if used outside of InteractiveCardProvider
 */
export function useInteractiveCard() {
  const context = useContext(InteractiveCardContext);
  if (context === undefined) {
    throw new Error(
      "useInteractiveCard must be used within an InteractiveCardProvider"
    );
  }
  return context;
}
