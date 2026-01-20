import { useId } from 'react';

interface GridPatternProps {
  variant?: 'diagonal' | 'l-shaped';
  color?: string;
  opacity?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  patternId?: string;
}

export function GridPattern({
  variant = 'l-shaped',
  color = 'currentColor',
  opacity = 0.15,
  size,
  strokeWidth = 1.5,
  className = '',
  patternId,
}: GridPatternProps) {
  const autoId = useId();
  const id = patternId || autoId;

  const defaultSize = variant === 'diagonal' ? 4 : 12;
  const patternSize = size ?? defaultSize;

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full select-none ${className}`}
      style={{ opacity }}
    >
      <defs>
        {variant === 'diagonal' ? (
          <pattern
            id={id}
            width={patternSize}
            height={patternSize}
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2={patternSize}
              stroke={color}
              strokeWidth={strokeWidth}
            />
          </pattern>
        ) : (
          <pattern
            id={id}
            width={patternSize}
            height={patternSize}
            patternUnits="userSpaceOnUse"
            x="-1"
            y="-1"
          >
            <path
              d={`M.5 ${patternSize}V.5H${patternSize}`}
              fill="none"
              stroke={color}
              strokeDasharray="0"
            />
          </pattern>
        )}
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth="0"
        fill={`url(#${id})`}
      />
    </svg>
  );
}
