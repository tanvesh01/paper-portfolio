/**
 * MorphSurface Component
 *
 * An animated morphing surface with expandable feedback interface.
 * Features smooth spring animations and click-outside detection.
 *
 * @example
 * ```tsx
 * import { MorphSurface } from "@/components/ui/morph-surface";
 *
 * export default function Page() {
 *   return (
 *     <div className="flex items-end justify-center min-h-screen p-8">
 *       <MorphSurface
 *         title="My App"
 *         buttonText="Contact"
 *         placeholder="Send us a message..."
 *       />
 *     </div>
 *   );
 * }
 * ```
 */

"use client";

import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { cx } from "class-variance-authority";
import { useClickOutside } from "@/hooks/use-click-outside";
import { GridPattern } from "@/components/ui/grid-pattern";

const SPEED = 1;
const FEEDBACK_WIDTH = 360;
const FEEDBACK_HEIGHT = 200;

interface MorphSurfaceProps {
  title?: string;
  buttonText?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
  customButton?: React.ReactNode;
}

interface FooterContextType {
  showFeedback: boolean;
  success: boolean;
  openFeedback: () => void;
  closeFeedback: () => void;
}

const FooterContext = React.createContext({} as FooterContextType);
const useFooter = () => React.useContext(FooterContext);

export function MorphSurface({
  title = "Morph Surface",
  buttonText = "Feedback",
  placeholder = "What's on your mind?",
  width = FEEDBACK_WIDTH,
  height = FEEDBACK_HEIGHT,
  onOpen,
  onClose,
  className,
  customButton,
}: MorphSurfaceProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const feedbackRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [showFeedback, setShowFeedback, mouse] = useLoop();
  const [success, setSuccess] = React.useState(false);

  function closeFeedback() {
    setShowFeedback(false);
    feedbackRef.current?.blur();
    onClose?.();
  }

  function openFeedback() {
    setShowFeedback(true);
    setTimeout(() => {
      feedbackRef.current?.focus();
    });
    onOpen?.();
  }

  function onFeedbackSuccess() {
    closeFeedback();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1500);
  }

  useClickOutside(rootRef, closeFeedback);

  const context = React.useMemo(
    () => ({
      showFeedback,
      success,
      openFeedback,
      closeFeedback,
    }),
    [showFeedback, success],
  );

  return (
    <div
      className={cx("flex items-center justify-center", className)}
      style={{
        width,
        height,
      }}
      {...mouse}
    >
      <motion.div
        data-footer
        ref={rootRef}
        className="bg-white relative flex flex-col items-center bottom-8 border border-neutral-200  max-sm:bottom-5 z-30 shadow-[0px_5px_0px_rgba(0,0,0,0.1)] overflow-hidden"
        initial={false}
        animate={{
          width: showFeedback ? width : "auto",
          height: showFeedback ? height : 44,
          borderRadius: showFeedback ? 14 : 6,
        }}
        transition={{
          type: "spring",
          stiffness: 550 / SPEED,
          damping: 45,
          mass: 0.7,
          delay: showFeedback ? 0 : 0.08,
        }}
      >
        <GridPattern
          variant="diagonal"
          className="text-primary"
          opacity={0.25}
        />
        <FooterContext value={context}>
          <Dock
            title={title}
            buttonText={buttonText}
            customButton={customButton}
          />
          <Feedback
            ref={feedbackRef}
            onSuccess={onFeedbackSuccess}
            placeholder={placeholder}
            width={width}
            height={height}
          />
        </FooterContext>
      </motion.div>
    </div>
  );
}

///////////////////////////////////////////////////////////////////////////////////////

function Dock({
  title,
  buttonText,
  customButton,
}: {
  title: string;
  buttonText: string;
  customButton?: React.ReactNode;
}) {
  const { success, showFeedback, openFeedback } = useFooter();

  return (
    <footer
      className="flex items-center justify-center select-none whitespace-nowrap mt-auto h-[44px] cursor-pointer"
      onClick={openFeedback}
    >
      <div className="flex items-center justify-center gap-6 px-3 max-sm:h-10 max-sm:px-2">
        <div className="flex items-center gap-2 w-fit">
          {showFeedback ? (
            <div className="w-5 h-5" style={{ opacity: 0 }} />
          ) : (
            <motion.div
              className="w-5 h-5 rounded-full text-primary"
              // style={{ backgroundColor: "orange" }}
              layoutId="morph-surface-dot"
              transition={LOGO_SPRING}
            >
              <span className="block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
                  />
                </svg>
              </span>
            </motion.div>
          )}
        </div>
        <p className="font-sane text-primary">Some Notable work @followalice</p>
        {/* {customButton ? (
          <div onClick={openFeedback}>{customButton}</div>
        ) : (
          <button
            className="font-sans cursor-pointer relative flex items-center gap-2 text-primary bg-transparent  py-1 rounded-md shadow-neutral-200 text-sm hover:bg-neutral-200/30 transition-colors"
            onClick={openFeedback}
            type="button"
          ></button>
        )} */}
      </div>
    </footer>
  );
}

///////////////////////////////////////////////////////////////////////////////////////

const Feedback = React.forwardRef<
  HTMLTextAreaElement,
  {
    onSuccess: () => void;
    placeholder: string;
    width: number;
    height: number;
  }
>(function Feedback({ onSuccess, placeholder, width, height }, ref) {
  const { closeFeedback, showFeedback } = useFooter();
  const submitRef = React.useRef<HTMLButtonElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Form submission logic removed - purely presentational
    onSuccess();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") {
      closeFeedback();
    }
    if (e.key === "Enter" && e.metaKey) {
      e.preventDefault();
      submitRef.current?.click();
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="absolute bottom-0"
      style={{
        width,
        height,
        pointerEvents: showFeedback ? "all" : "none",
      }}
    >
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 550 / SPEED,
              damping: 45,
              mass: 0.7,
            }}
            className="p-1 flex flex-col h-full"
          ></motion.div>
        )}
      </AnimatePresence>
      {showFeedback && (
        <motion.div
          layoutId="morph-surface-dot"
          className="w-2 h-2 rounded-full absolute top-[18.5px] left-4"
          style={{ backgroundColor: "orange" }}
          transition={LOGO_SPRING}
        />
      )}
    </form>
  );
});

///////////////////////////////////////////////////////////////////////////////////////

const LOGO_SPRING = {
  type: "spring",
  stiffness: 350 / SPEED,
  damping: 35,
} as const;

function useLoop(): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  },
] {
  const [show, setShow] = React.useState(false);

  // No auto-animation - removed the interval loop
  function onMouseEnter() {
    // No action needed
  }

  function onMouseLeave() {
    // No action needed
  }

  return [
    show,
    setShow,
    {
      onMouseEnter,
      onMouseLeave,
    },
  ];
}

function IconCheck() {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="white"
    >
      <path
        d="M5 13L9 17L19 7"
        stroke="white"
        strokeWidth="2px"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Kbd({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <kbd
      className={cx(
        "w-6 h-6 bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded flex items-center justify-center font-sans px-1.5 text-xs",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
