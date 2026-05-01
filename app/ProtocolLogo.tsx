/**
 * Protocol icon — uses DeFiLlama's icon CDN, which normalizes logos by the
 * same slug we use everywhere ("aave-v3", "morpho-blue", "fluid-lending"…).
 *
 * Falls back gracefully: if the image fails to load, the alt text shows.
 * We render with native <img> rather than next/image because the CDN URL
 * is dynamic per row and we don't need the optimization pipeline.
 */
type Props = {
  project: string;
  size?: number;
  className?: string;
};

export default function ProtocolLogo({
  project,
  size = 20,
  className = "",
}: Props) {
  const px = size * 2;
  const src = `https://icons.llamao.fi/icons/protocols/${encodeURIComponent(project)}?w=${px}&h=${px}`;
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={`shrink-0 rounded-full bg-elev ring-1 ring-hairline ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
