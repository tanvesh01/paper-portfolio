'use client';

import { useState, useMemo } from 'react';
import { BlogPostMetadata } from '@/types/blog';
import BlogCard from './BlogCard';
import TagFilter from './TagFilter';

interface BlogListingClientProps {
  posts: BlogPostMetadata[];
  tags: string[];
}

export default function BlogListingClient({
  posts,
  tags,
}: BlogListingClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((post) =>
      post.frontmatter.tags
        .map((t) => t.toLowerCase())
        .includes(selectedTag.toLowerCase())
    );
  }, [posts, selectedTag]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-white z-0" />

        {/* Decorative Pattern */}
        <svg className="pointer-events-none absolute inset-0 size-full select-none text-blue-500/80 opacity-[.15] z-0">
          <defs>
            <pattern
              id="hero-pattern"
              width="4"
              height="4"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="4"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <h1 className="font-departure text-6xl uppercase text-primary mb-4">
            Writing
          </h1>
          <p className="font-mono text-sm uppercase text-neutral-600">
            Thoughts on engineering, design, and endurance
          </p>
        </div>
      </section>

      {/* Tag Filter Section */}
      <section className="sticky top-0 z-20 bg-white border-b border-primary-border py-6">
        <div className="max-w-6xl mx-auto px-6">
          <TagFilter
            tags={tags}
            selectedTag={selectedTag}
            onTagSelect={setSelectedTag}
          />
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center font-mono uppercase text-neutral-600">
              No posts found
              {selectedTag && (
                <>
                  {' '}
                  for tag <span className="text-primary">{selectedTag}</span>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
