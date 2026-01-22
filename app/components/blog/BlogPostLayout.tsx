import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import ScrollingImages from './ScrollingImages';
import MarkdownContent from './MarkdownContent';

interface BlogPostLayoutProps {
  post: BlogPost;
}

export default function BlogPostLayout({ post }: BlogPostLayoutProps) {
  const { frontmatter, htmlContent } = post;
  const { title, date, author, tags, readingTime, featuredImage, images } =
    frontmatter;

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-24 px-6 max-w-7xl mx-auto">
        <Link
          href="/blog"
          className="inline-block font-mono text-xs uppercase text-primary hover:opacity-80 mb-12"
        >
          ← Back to all posts
        </Link>

        {/* Featured Image - Mobile Only */}
        <div className="lg:hidden relative w-full h-96 mb-12">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        <div className="max-w-3xl">
          <h1 className="font-departure text-5xl md:text-6xl uppercase text-primary mb-6">
            {title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase text-neutral-600 mb-6">
            <time dateTime={date}>{formattedDate}</time>
            <span>•</span>
            <span>{author}</span>
            <span>•</span>
            <span>{readingTime}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="px-2 py-1 text-xs font-mono uppercase border border-primary-border text-primary hover:bg-primary hover:text-white transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content - 2 Column Layout */}
      <main className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Desktop: 1/3 + 2/3 Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Scrolling Images Column - Desktop Only */}
            <aside className="hidden lg:block lg:col-span-1">
              <ScrollingImages images={images} altPrefix={title} />
            </aside>

            {/* Content Column */}
            <article className="lg:col-span-2">
              <MarkdownContent htmlContent={htmlContent} />
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
