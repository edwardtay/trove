import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-md flex-col items-start px-6 py-20">
      <div className="inline-flex items-center gap-2 rounded-md border border-hairline bg-subtle px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
        <Compass className="h-3 w-3" aria-hidden />
        404
      </div>

      <h1
        className="mt-5 text-[36px] font-semibold leading-[1.05] tracking-crunched text-ink sm:text-[48px]"
        style={{ fontVariationSettings: '"opsz" 48' }}
      >
        Off the map.
      </h1>

      <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">
        The agent doesn&apos;t have a route for this URL. Try one of the
        ones it does:
      </p>

      <ul className="mt-4 space-y-2 text-[14px]">
        <li>
          <Link href="/" className="font-medium text-ink hover:text-emerald-700">
            /
          </Link>
          <span className="ml-2 text-ink-faint">live yields + agent</span>
        </li>
        <li>
          <Link href="/notes" className="font-medium text-ink hover:text-emerald-700">
            /notes
          </Link>
          <span className="ml-2 text-ink-faint">
            plan · simulator · benchmark
          </span>
        </li>
        <li>
          <Link href="/agents" className="font-medium text-ink hover:text-emerald-700">
            /agents
          </Link>
          <span className="ml-2 text-ink-faint">three iNFT variants</span>
        </li>
      </ul>
    </main>
  );
}
