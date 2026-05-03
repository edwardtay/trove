const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#1c1917"/>
  <circle cx="1020" cy="40" r="360" fill="#059669" fill-opacity="0.35"/>
  <circle cx="960" cy="120" r="210" fill="#34d399" fill-opacity="0.18"/>

  <!-- Logo mark + wordmark -->
  <rect x="80" y="78" width="44" height="44" rx="10" fill="#059669"/>
  <g transform="translate(102 100)" stroke="#fafaf9" fill="none">
    <circle r="13" stroke-width="2.5" stroke-dasharray="55 8" stroke-linecap="round" transform="rotate(-30)"/>
    <circle r="4" fill="#fafaf9" stroke="none"/>
  </g>
  <text x="142" y="110" fill="#fafaf9" font-family="Arial, sans-serif" font-size="30" font-weight="700">Trove</text>
  <text x="225" y="110" fill="#a8a29e" font-family="Menlo, monospace" font-size="18">trove.web3wagmi.eth</text>

  <!-- Headline -->
  <text x="80" y="245" fill="#fafaf9" font-family="Arial, sans-serif" font-size="92" font-weight="800" letter-spacing="-3">Earn the yield</text>
  <text x="80" y="345" fill="#34d399" font-family="Arial, sans-serif" font-size="92" font-weight="800" letter-spacing="-3">you're missing.</text>

  <!-- Subtitle -->
  <text x="80" y="420" fill="#d6d3d1" font-family="Arial, sans-serif" font-size="28">Auto-claims Aave + Merkl rewards across Base.</text>
  <text x="80" y="462" fill="#d6d3d1" font-family="Arial, sans-serif" font-size="28">iNFT identity on 0G. ENS-discoverable. x402-paid decisions.</text>

  <!-- Footer pills -->
  <line x1="80" y1="520" x2="1120" y2="520" stroke="#fafaf9" stroke-opacity="0.14"/>
  <text x="80" y="570" fill="#a8a29e" font-family="Menlo, monospace" font-size="18">live · Base mainnet</text>
  <text x="290" y="570" fill="#a8a29e" font-family="Menlo, monospace" font-size="18">7 protocols watched</text>
  <text x="525" y="570" fill="#a8a29e" font-family="Menlo, monospace" font-size="18">iNFT #0 on 0G Galileo</text>
  <text x="800" y="570" fill="#a8a29e" font-family="Menlo, monospace" font-size="18">KeeperHub auto-claim</text>
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
