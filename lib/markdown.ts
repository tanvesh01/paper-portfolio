import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse) // Parse markdown to syntax tree
    .use(remarkRehype) // Convert markdown AST to HTML AST
    .use(rehypeHighlight, {
      // Configure syntax highlighting
      subset: ['javascript', 'typescript', 'python', 'bash', 'css', 'html', 'json'],
    })
    .use(rehypeStringify) // Convert HTML AST to string
    .process(markdown);

  return result.toString();
}
