"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the digest so server logs and this client view can be matched
    console.error("[trove] page error:", error.message, error.digest);
  }, [error]);

  return (
    <main className="mx-auto flex max-w-md flex-col items-start px-6 py-20">
      <div className="inline-flex items-center gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-700">
        <AlertCircle className="h-3 w-3" aria-hidden />
        Page error
      </div>

      <h1
        className="mt-5 text-[36px] font-semibold leading-[1.05] tracking-crunched text-ink sm:text-[48px]"
        style={{ fontVariationSettings: '"opsz" 48' }}
      >
        Something cracked.
      </h1>

      <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">
        The agent hit an exception rendering this page. Most often this is a
        flaky upstream — DeFiLlama, Base RPC, or the 0G indexer hiccuping.
        Retry usually clears it.
      </p>

      {error.message && (
        <pre className="mt-4 w-full overflow-x-auto rounded-md border border-hairline bg-subtle p-3 text-[12px] text-ink-muted">
          {error.message}
        </pre>
      )}
      {error.digest && (
        <p className="mt-2 font-mono text-[11px] text-ink-faint">
          digest · {error.digest}
        </p>
      )}

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="group inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-[13px] font-semibold text-paper transition-all hover:bg-ink-muted"
        >
          <RotateCw className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
          Try again
        </button>
        <Link
          href="/"
          className="text-[13px] text-ink-subtle hover:text-ink"
        >
          ← home
        </Link>
      </div>
    </main>
  );
}
