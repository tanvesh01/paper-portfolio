import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';
import BlogPostLayout from '@/app/components/blog/BlogPostLayout';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params; // Next.js 16: params are Promises!

  try {
    const post = await getPostBySlug(slug);
    const { title, description, featuredImage, author, tags } =
      post.frontmatter;

    return {
      title: `${title} | Tanvesh`,
      description,
      authors: [{ name: author }],
      keywords: tags,
      openGraph: {
        title,
        description,
        images: [featuredImage],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [featuredImage],
      },
    };
  } catch (error) {
    return {
      title: 'Post Not Found | Tanvesh',
    };
  }
}

// Blog post page component
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params; // Next.js 16: params are Promises!

  try {
    const post = await getPostBySlug(slug);
    return <BlogPostLayout post={post} />;
  } catch (error) {
    notFound();
  }
}
