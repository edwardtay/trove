/**
 * Inline SVG sparkline. Renders a tiny line chart of the last N values,
 * with a subtle area fill below and a single dot at the latest sample.
 *
 * Designed for inline use next to a percentage display:
 *   <span>4.32%  <Sparkline values={[4.1, 4.2, 4.3, 4.32, 4.5, 4.4, 4.32]} /></span>
 */
export default function Sparkline({
  values,
  width = 64,
  height = 18,
  color = "#059669",
}: {
  values: number[];
  width?: number;
  height?: number;
  color?: string;
}) {
  if (values.length < 2) {
    return null;
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const padY = 2;
  const innerH = height - padY * 2;

  const x = (i: number) =>
    values.length === 1 ? 0 : (i / (values.length - 1)) * width;
  const y = (v: number) => padY + (1 - (v - min) / span) * innerH;

  const linePath = values
    .map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L${x(values.length - 1).toFixed(1)},${height} L0,${height} Z`;

  const last = values[values.length - 1]!;
  const first = values[0]!;
  const trendUp = last >= first;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className="inline-block"
      aria-hidden
    >
      <path
        d={areaPath}
        fill={color}
        fillOpacity="0.08"
        stroke="none"
      />
      <path
        d={linePath}
        fill="none"
        stroke={trendUp ? color : "#d97706"}
        strokeWidth="1.25"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle
        cx={x(values.length - 1)}
        cy={y(last)}
        r="2"
        fill={trendUp ? color : "#d97706"}
      />
    </svg>
  );
}
