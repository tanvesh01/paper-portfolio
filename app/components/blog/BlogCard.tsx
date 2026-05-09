import Image from 'next/image';
import Link from 'next/link';
import { BlogPostMetadata } from '@/types/blog';

interface BlogCardProps {
  post: BlogPostMetadata;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { slug, frontmatter } = post;
  const { title, description, featuredImage, date, author, tags, readingTime } =
    frontmatter;

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/blog/${slug}`}
      className="group block border border-primary-border transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:border-primary"
    >
      <article className="h-full flex flex-col">
        {/* Featured Image */}
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-mono uppercase border border-primary-border text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="font-departure text-2xl uppercase text-primary mb-3 transition-opacity duration-150 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-80">
            {title}
          </h2>

          {/* Description */}
          <p className="font-sans text-foreground text-sm mb-4 flex-1">
            {description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs font-mono uppercase text-neutral-600">
            <time dateTime={date}>{formattedDate}</time>
            <span>•</span>
            <span>{author}</span>
            <span>•</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
