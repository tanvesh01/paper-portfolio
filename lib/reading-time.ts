export function calculateReadingTime(content: string): string {
  // Remove code blocks (slower reading, counted separately)
  const codeBlockRegex = /```[\s\S]*?```/g;
  const codeBlocks = content.match(codeBlockRegex) || [];
  const contentWithoutCode = content.replace(codeBlockRegex, '');

  // Count words in regular content (200 words per minute)
  const words = contentWithoutCode.trim().split(/\s+/).length;
  const regularReadingTime = words / 200;

  // Count code blocks (assume 30 seconds per block for slower reading)
  const codeBlockTime = codeBlocks.length * 0.5; // 0.5 minutes per block

  // Total reading time in minutes
  const totalMinutes = Math.ceil(regularReadingTime + codeBlockTime);

  if (totalMinutes < 1) {
    return '1 min read';
  }

  return `${totalMinutes} min read`;
}
