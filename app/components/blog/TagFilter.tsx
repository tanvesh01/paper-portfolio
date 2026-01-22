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
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
      <button
        onClick={() => onTagSelect(null)}
        className={`px-4 py-2 text-xs font-mono uppercase whitespace-nowrap transition-all ${
          selectedTag === null
            ? 'bg-primary text-white'
            : 'border border-primary-border text-foreground hover:border-primary'
        }`}
      >
        All
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={`px-4 py-2 text-xs font-mono uppercase whitespace-nowrap transition-all ${
            selectedTag === tag
              ? 'bg-primary text-white'
              : 'border border-primary-border text-foreground hover:border-primary'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
