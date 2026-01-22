import { getAllPosts, getAllTags } from '@/lib/blog';
import { Metadata } from 'next';
import BlogListingClient from '@/app/components/blog/BlogListingClient';

export const metadata: Metadata = {
  title: 'Writing | Tanvesh',
  description: 'Thoughts on engineering, design, and endurance',
};

export default async function BlogPage() {
  const [allPosts, allTags] = await Promise.all([getAllPosts(), getAllTags()]);

  return <BlogListingClient posts={allPosts} tags={allTags} />;
}
