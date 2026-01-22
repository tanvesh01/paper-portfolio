'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ScrollingImagesProps {
  images: string[];
  altPrefix: string;
}

export default function ScrollingImages({
  images,
  altPrefix,
}: ScrollingImagesProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // Listen for custom event from MarkdownContent component
    const handleSectionChange = (event: CustomEvent) => {
      const { sectionIndex, totalSections } = event.detail;

      // Map sections to images
      // Distribute sections evenly across available images
      const imagesCount = images.length;
      const sectionsPerImage = Math.ceil(totalSections / imagesCount);
      const imageIndex = Math.min(
        Math.floor(sectionIndex / sectionsPerImage),
        imagesCount - 1
      );

      setActiveImageIndex(imageIndex);
    };

    window.addEventListener(
      'scrollSectionChange',
      handleSectionChange as EventListener
    );

    return () => {
      window.removeEventListener(
        'scrollSectionChange',
        handleSectionChange as EventListener
      );
    };
  }, [images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-hidden">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-all duration-500 ${
              index === activeImageIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={image}
              alt={`${altPrefix} - Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="33vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
