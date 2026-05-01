/**
 * Inline brand mark — rounded emerald square with an orbital dashed ring
 * around a center dot. Reads as "agent watching an asset, rotating it."
 * Same shape as the favicon/apple-icon for consistent recognition.
 */
export default function Logo({
  size = 28,
  withWordmark = false,
  className,
}: {
  size?: number;
  withWordmark?: boolean;
  className?: string;
}) {
  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="32" height="32" rx="7" fill="#059669" />
      <g transform="translate(16 16)" stroke="white" fill="none">
        <circle
          r="9"
          strokeWidth="2"
          strokeDasharray="38 6"
          strokeLinecap="round"
          transform="rotate(-30)"
        />
        <circle r="3" fill="white" stroke="none" />
      </g>
    </svg>
  );

  if (!withWordmark) {
    return <span className={className}>{mark}</span>;
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      {mark}
      <span
        className="text-[16px] font-semibold tracking-tightish text-ink"
        style={{ fontVariationSettings: '"opsz" 18' }}
      >
        Trove
      </span>
    </span>
  );
}
