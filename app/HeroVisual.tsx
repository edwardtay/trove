/**
 * Animated orbital hero — same conceptual mark as the favicon, scaled up
 * with subtle motion. Renders a center disc, an orbiting dashed ring, and
 * three "asset" dots that traverse the orbit. Pure CSS animation, no JS.
 *
 * Visual language: a coin (your USDC) at center, the agent's watching/
 * harvesting cycle visible as motion around it.
 */
export default function HeroVisual({ size = 220 }: { size?: number }) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Soft radial wash behind */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(5,150,105,0.10) 0%, rgba(5,150,105,0) 65%)",
        }}
      />
      <svg
        viewBox="0 0 220 220"
        width={size}
        height={size}
        className="relative"
      >
        {/* Outer dashed ring — slow rotation */}
        <g className="origin-center" style={{ animation: "spin-slow 28s linear infinite" }}>
          <circle
            cx="110"
            cy="110"
            r="92"
            fill="none"
            stroke="#059669"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            opacity="0.55"
          />
        </g>

        {/* Mid dashed ring with a single accent gap arc — counter rotation */}
        <g
          className="origin-center"
          style={{ animation: "spin-rev 18s linear infinite" }}
        >
          <circle
            cx="110"
            cy="110"
            r="74"
            fill="none"
            stroke="#059669"
            strokeWidth="2"
            strokeDasharray="178 80"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>

        {/* Three orbital dots */}
        <g style={{ animation: "spin-slow 14s linear infinite", transformOrigin: "110px 110px" }}>
          <circle cx="110" cy="36" r="4.5" fill="#059669" />
        </g>
        <g
          style={{
            animation: "spin-slow 22s linear infinite",
            transformOrigin: "110px 110px",
            animationDelay: "-8s",
          }}
        >
          <circle cx="110" cy="184" r="3.5" fill="#d97706" />
        </g>
        <g
          style={{
            animation: "spin-slow 30s linear infinite",
            transformOrigin: "110px 110px",
            animationDelay: "-15s",
          }}
        >
          <circle cx="36" cy="110" r="3" fill="#2563eb" />
        </g>

        {/* Center disc — your USDC */}
        <circle cx="110" cy="110" r="28" fill="#059669" />
        <text
          x="110"
          y="115"
          textAnchor="middle"
          fill="white"
          fontFamily="ui-sans-serif, system-ui"
          fontWeight="700"
          fontSize="14"
          letterSpacing="0.5"
        >
          USDC
        </text>

        {/* Subtle pulse halo */}
        <circle
          cx="110"
          cy="110"
          r="28"
          fill="none"
          stroke="#059669"
          strokeWidth="1.5"
          opacity="0.4"
          style={{ animation: "halo 2.4s ease-out infinite" }}
        />
      </svg>

      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes spin-rev  { to { transform: rotate(-360deg); } }
        @keyframes halo {
          0%   { r: 28; opacity: 0.5; }
          80%  { r: 50; opacity: 0; }
          100% { r: 50; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
