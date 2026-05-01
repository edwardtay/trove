const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#1c1917"/>
  <circle cx="1020" cy="40" r="360" fill="#059669" fill-opacity="0.35"/>
  <circle cx="960" cy="120" r="210" fill="#34d399" fill-opacity="0.18"/>
  <rect x="80" y="78" width="44" height="44" rx="10" fill="#059669"/>
  <circle cx="102" cy="100" r="7" fill="#fafaf9"/>
  <text x="142" y="110" fill="#fafaf9" font-family="Arial, sans-serif" font-size="30" font-weight="700">Trove</text>
  <text x="80" y="245" fill="#fafaf9" font-family="Arial, sans-serif" font-size="92" font-weight="800" letter-spacing="-3">Earn the yield</text>
  <text x="80" y="345" fill="#34d399" font-family="Arial, sans-serif" font-size="92" font-weight="800" letter-spacing="-3">you're missing.</text>
  <text x="80" y="420" fill="#d6d3d1" font-family="Arial, sans-serif" font-size="28">USDC yield agent on Base. Auto-claims rewards.</text>
  <text x="80" y="462" fill="#d6d3d1" font-family="Arial, sans-serif" font-size="28">Two-sided x402. iNFT identity on 0G.</text>
  <line x1="80" y1="520" x2="1120" y2="520" stroke="#fafaf9" stroke-opacity="0.14"/>
  <text x="80" y="570" fill="#a8a29e" font-family="Menlo, monospace" font-size="20">live - Base mainnet</text>
  <text x="330" y="570" fill="#a8a29e" font-family="Menlo, monospace" font-size="20">watching 7 protocols</text>
  <text x="650" y="570" fill="#a8a29e" font-family="Menlo, monospace" font-size="20">iNFT on 0G Galileo</text>
  <text x="945" y="570" fill="#a8a29e" font-family="Menlo, monospace" font-size="20">x402 buyer + seller</text>
</svg>`;

export const runtime = "nodejs";

export function GET() {
  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
