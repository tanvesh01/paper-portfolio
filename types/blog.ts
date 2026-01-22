export interface BlogPostFrontmatter {
  title: string;
  date: string;
  description: string;
  featuredImage: string;
  author: string;
  tags: string[];
  readingTime: string;
  images: string[]; // For scrolling images column
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  htmlContent: string;
}

export interface BlogPostMetadata {
  slug: string;
  frontmatter: BlogPostFrontmatter;
}
