'use client';

import { useEffect, useRef } from 'react';

interface MarkdownContentProps {
  htmlContent: string;
}

export default function MarkdownContent({ htmlContent }: MarkdownContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Find all major sections (h2, h3 headings)
    const sections = contentRef.current.querySelectorAll('h2, h3');
    const totalSections = sections.length;

    if (totalSections === 0) return;

    // Create intersection observer for each section
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionIndex = Array.from(sections).indexOf(
            entry.target as Element
          );

          // Dispatch custom event for ScrollingImages component
          const event = new CustomEvent('scrollSectionChange', {
            detail: { sectionIndex, totalSections },
          });
          window.dispatchEvent(event);
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [htmlContent]);

  return (
    <div
      ref={contentRef}
      className="prose prose-lg max-w-none font-ibm-plex-serif"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
