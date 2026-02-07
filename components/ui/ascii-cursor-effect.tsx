'use client';

import { useEffect, useRef, useState, RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getBrightness,
  brightnessToAscii,
  shouldInvertColor,
  isInRadius,
  getGradientOpacity,
} from '@/lib/ascii-utils';

interface AsciiCursorEffectProps {
  imageUrl: string;
  containerRef: RefObject<HTMLDivElement | null>;
  radius?: number;
  gridSize?: number;
  className?: string;
}

export function AsciiCursorEffect({
  imageUrl,
  containerRef,
  radius = 125,
  gridSize = 14,
  className = '',
}: AsciiCursorEffectProps) {
  // State
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Refs
  const visibleCanvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Load image into hidden canvas
  useEffect(() => {
    const hiddenCanvas = hiddenCanvasRef.current;
    if (!hiddenCanvas) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const ctx = hiddenCanvas.getContext('2d');
      if (!ctx) return;

      // Set canvas dimensions to match image
      hiddenCanvas.width = img.width;
      hiddenCanvas.height = img.height;

      // Draw image to canvas for pixel sampling
      ctx.drawImage(img, 0, 0);

      imageRef.current = img;
      setImageLoaded(true);
    };

    img.onerror = () => {
      console.error('Failed to load image for ASCII effect');
    };

    img.src = imageUrl;
  }, [imageUrl]);

  // Setup resize observer for responsive dimensions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  // Setup mouse tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !imageLoaded) return;

    let leaveTimeout: NodeJS.Timeout | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // On first mouse move, make visible
      if (!isVisible) {
        setIsVisible(true);
      }

      // Cancel previous RAF if exists
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      // Schedule update on next frame
      rafRef.current = requestAnimationFrame(() => {
        setMousePos({ x, y });
      });
    };

    const handleMouseLeave = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      // Trigger exit animation
      setIsVisible(false);

      // Clear mousePos after animation completes (300ms)
      leaveTimeout = setTimeout(() => {
        setMousePos(null);
      }, 300);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      if (leaveTimeout) {
        clearTimeout(leaveTimeout);
      }
    };
  }, [containerRef, imageLoaded, isVisible]);

  // Render ASCII effect
  useEffect(() => {
    const visibleCanvas = visibleCanvasRef.current;
    const hiddenCanvas = hiddenCanvasRef.current;

    if (!visibleCanvas || !hiddenCanvas || !mousePos || !imageLoaded) {
      // Only clear canvas when component is fully unmounted (not during exit animation)
      if (visibleCanvas && !isVisible && !mousePos) {
        const ctx = visibleCanvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, visibleCanvas.width, visibleCanvas.height);
        }
      }
      return;
    }

    const visibleCtx = visibleCanvas.getContext('2d');
    const hiddenCtx = hiddenCanvas.getContext('2d');

    if (!visibleCtx || !hiddenCtx) return;

    // Setup canvas for high DPI displays
    const dpr = window.devicePixelRatio || 1;
    visibleCanvas.width = dimensions.width * dpr;
    visibleCanvas.height = dimensions.height * dpr;
    visibleCanvas.style.width = `${dimensions.width}px`;
    visibleCanvas.style.height = `${dimensions.height}px`;
    visibleCtx.scale(dpr, dpr);

    // Clear canvas
    visibleCtx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Calculate scaling factor between visible and hidden canvas
    const scaleX = hiddenCanvas.width / dimensions.width;
    const scaleY = hiddenCanvas.height / dimensions.height;

    // Calculate grid bounds
    const startX = Math.max(0, Math.floor((mousePos.x - radius) / gridSize) * gridSize);
    const endX = Math.min(dimensions.width, Math.ceil((mousePos.x + radius) / gridSize) * gridSize);
    const startY = Math.max(0, Math.floor((mousePos.y - radius) / gridSize) * gridSize);
    const endY = Math.min(dimensions.height, Math.ceil((mousePos.y + radius) / gridSize) * gridSize);

    // Set font for ASCII characters
    visibleCtx.font = `${gridSize}px "Geist Mono", monospace`;
    visibleCtx.textBaseline = 'top';

    // Wait for font to load
    document.fonts.ready.then(() => {
      // Render ASCII characters in circular area
      for (let y = startY; y < endY; y += gridSize) {
        for (let x = startX; x < endX; x += gridSize) {
          // Check if in circular radius
          if (!isInRadius(x, y, mousePos.x, mousePos.y, radius)) continue;

          // Map visible canvas coordinates to hidden canvas coordinates
          const imgX = Math.floor(x * scaleX);
          const imgY = Math.floor(y * scaleY);

          // Sample pixel from hidden canvas
          try {
            const imageData = hiddenCtx.getImageData(imgX, imgY, 1, 1).data;
            const brightness = getBrightness(imageData[0], imageData[1], imageData[2]);

            // Get ASCII character
            const char = brightnessToAscii(brightness);

            // Calculate gradient opacity based on distance from cursor center
            const opacity = getGradientOpacity(x, y, mousePos.x, mousePos.y, radius);

            // Set color based on brightness with gradient opacity
            const baseColor = shouldInvertColor(brightness) ? '255, 255, 255' : '0, 0, 0';
            visibleCtx.fillStyle = `rgba(${baseColor}, ${opacity})`;

            // Draw character
            visibleCtx.fillText(char, x, y);
          } catch (e) {
            // Skip if sampling fails (e.g., out of bounds)
            continue;
          }
        }
      }
    });
  }, [mousePos, imageLoaded, dimensions, radius, gridSize, isVisible]);

  return (
    <>
      {/* Hidden canvas for pixel sampling */}
      <canvas
        ref={hiddenCanvasRef}
        className="hidden"
        aria-hidden="true"
      />

      {/* Visible canvas for ASCII rendering with AnimatePresence */}
      <AnimatePresence mode="wait">
        {isVisible && imageLoaded && (
          <motion.div
            key="ascii-effect"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1.0]
            }}
            className={`absolute inset-0 pointer-events-none z-10 ${className}`}
          >
            <canvas
              ref={visibleCanvasRef}
              className="w-full h-full"
              style={{
                width: dimensions.width,
                height: dimensions.height,
              }}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
