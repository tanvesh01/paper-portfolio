"use client";

import { useEffect, useRef, useState } from "react";

interface AutoplayVideoProps {
  src: string;
  className?: string;
  containerClassName?: string;
  slowMotionRate?: number;
}

export function AutoplayVideo({
  src,
  className = "",
  containerClassName = "",
  slowMotionRate = 0.5,
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
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
      threshold: 0.5, // Trigger when 50% of video is visible
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);

        if (entry.isIntersecting) {
          // Autoplay when visible
          videoElement
            .play()
            .catch((error) => {
              // Handle autoplay rejection (e.g., browser policies)
              console.warn("Video autoplay failed:", error);
            });
        } else {
          // Pause when out of view
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
        className={`${className} cursor-pointer`}
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
