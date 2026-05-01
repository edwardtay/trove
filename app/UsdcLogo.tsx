/**
 * Inline USDC mark. Authoritative blue circle + white "$" — the Circle brand
 * uses #2775CA. Inlined as SVG so it always loads (no external CDN risk on
 * the hero where it's prominent).
 */
export default function UsdcLogo({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
    >
      <circle cx="16" cy="16" r="16" fill="#2775CA" />
      <path
        fill="#fff"
        d="M20.7 18.2c0-2.5-1.5-3.4-4.5-3.7-2.1-.3-2.6-.9-2.6-1.9 0-1.1.7-1.7 2.2-1.7 1.4 0 2.1.5 2.4 1.6.1.3.4.5.7.5h1.1c.4 0 .7-.3.7-.7v-.1c-.3-1.7-1.7-3-3.5-3.1V8c0-.4-.3-.7-.8-.8h-1c-.4 0-.7.3-.8.8v1.1c-2.1.3-3.4 1.7-3.4 3.5 0 2.4 1.4 3.4 4.5 3.7 1.9.4 2.6.8 2.6 2 0 1.1-1 1.9-2.4 1.9-1.9 0-2.6-.8-2.8-1.9-.1-.3-.4-.5-.7-.5h-1.2c-.4 0-.7.3-.7.7v.1c.3 1.9 1.5 3.2 3.7 3.6V24c0 .4.3.7.8.8h1c.4 0 .7-.3.8-.8v-1.1c2.1-.4 3.5-1.8 3.5-3.7z"
      />
    </svg>
  );
}
