"use client";

import { useEffect, useRef } from "react";

interface AutoplayVideoProps {
  src: string;
  className?: string;
  containerClassName?: string;
  slowMotionRate?: number;
}

const PAUSE_VIDEO_BY_DEFAULT = false;

export function AutoplayVideo({
  src,
  className = "",
  containerClassName = "",
  slowMotionRate = 0.5,
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasFinePointer = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const handleMouseEnter = () => {
    if (videoRef.current && hasFinePointer()) {
      videoRef.current.playbackRate = slowMotionRate;
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observerOptions = {
      threshold: 0.5,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !PAUSE_VIDEO_BY_DEFAULT) {
          videoElement.play().catch((error) => {
            console.warn("Video autoplay failed:", error);
          });
        } else {
          videoElement.pause();
        }
      });
    }, observerOptions);

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={containerClassName}>
      <video
        ref={videoRef}
        src={src}
        className={className}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="FollowAlice adventure trip showcase video"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <track kind="captions" />
      </video>
    </div>
  );
}
