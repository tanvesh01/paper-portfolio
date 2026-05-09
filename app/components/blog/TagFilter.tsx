'use client';

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export default function TagFilter({
  tags,
  selectedTag,
  onTagSelect,
}: TagFilterProps) {
  const getButtonClassName = (isSelected: boolean) =>
    `px-4 py-2 text-xs font-mono uppercase whitespace-nowrap transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97] ${
      isSelected
        ? 'border border-primary bg-primary text-white'
        : 'border border-primary-border text-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:border-primary'
    }`;

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
      <button
        onClick={() => onTagSelect(null)}
        aria-pressed={selectedTag === null}
        className={getButtonClassName(selectedTag === null)}
      >
        All
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          aria-pressed={selectedTag === tag}
          className={getButtonClassName(selectedTag === tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
