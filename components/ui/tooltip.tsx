"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";

const TooltipProvider = TooltipPrimitive.Provider;

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  delayDuration?: number;
}

function Tooltip({
  children,
  content,
  side = "top",
  align = "center",
  sideOffset = 8,
  delayDuration = 100,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={sideOffset}
            forceMount
            asChild
          >
            <motion.div
              className="z-50 overflow-hidden border border-dotted border-yellow-300 bg-yellow-100 p-1 text-sm text-black shadow-md"
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {content}
            </motion.div>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

interface SimpleTooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
}

function SimpleTooltip({
  content,
  children,
  side = "top",
  align = "center",
  delayDuration = 100,
}: SimpleTooltipProps) {
  return (
    <Tooltip
      content={<p className="font-departure text-xs uppercase">{content}</p>}
      side={side}
      align={align}
      delayDuration={delayDuration}
    >
      {children}
    </Tooltip>
  );
}

export { Tooltip, SimpleTooltip, TooltipProvider };
