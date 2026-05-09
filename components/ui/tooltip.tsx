"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

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
    <TooltipPrimitive.Root delayDuration={delayDuration}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          className="z-50 origin-[var(--radix-tooltip-content-transform-origin)] scale-[0.98] overflow-hidden border border-dotted border-yellow-300 bg-yellow-100 p-1 text-sm text-black opacity-0 shadow-md transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] data-[state=delayed-open]:scale-100 data-[state=delayed-open]:opacity-100 data-[state=instant-open]:scale-100 data-[state=instant-open]:opacity-100"
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
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
