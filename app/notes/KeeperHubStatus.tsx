/**
 * Server component that renders live KeeperHub connection status.
 * Shares the same live probe as /api/keeperhub: auth, workflow list, and a
 * helloworld workflow call.
 */

import { CheckCircle2, AlertCircle, Zap } from "lucide-react";
import { getKeeperHubStatus } from "../../src/keeperhub-status";

export default async function KeeperHubStatus() {
  const data = await getKeeperHubStatus();
  if (!data || !data.configured) {
    return (
      <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm">
        <div className="font-semibold text-amber-900">
          KeeperHub: not configured
        </div>
        <p className="mt-1 text-neutral-700">
          Set <code>KEEPERHUB_API_KEY</code> in <code>.env.local</code>. Free
          tier API key from{" "}
          <a
            href="https://app.keeperhub.com"
            className="underline"
            target="_blank"
          >
            app.keeperhub.com
          </a>
          .
        </p>
      </div>
    );
  }

  const authOk = data.auth && !("error" in data.auth);
  const hello = data.helloworld;
  const helloOk = hello?.ok === true;
  const helloExecutionId = helloOk ? hello.executionId : undefined;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
      <div className="rounded-md border border-emerald-200 bg-emerald-50/50 p-4 text-sm">
        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
          Authentication
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          {authOk ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-rose-600" />
          )}
          <span className="text-[13px] font-medium text-neutral-900">
            {authOk ? data.auth?.name : "auth failed"}
          </span>
        </div>
        <div className="mt-1 font-mono text-[10px] text-neutral-500">
          Bearer · kh_…
        </div>
      </div>

      <div className="rounded-md border border-emerald-200 bg-emerald-50/50 p-4 text-sm">
        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
          Free workflow call
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          {helloOk ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-rose-600" />
          )}
          <span className="text-[13px] font-medium text-neutral-900">
            helloworld → {helloOk ? "success" : "failed"}
          </span>
        </div>
        {helloExecutionId && (
          <div className="mt-1 font-mono text-[10px] text-neutral-500">
            execId · {helloExecutionId.slice(0, 14)}…
          </div>
        )}
        {!helloOk && hello && "error" in hello && (
          <div className="mt-1 line-clamp-2 font-mono text-[10px] text-rose-700">
            {hello.error}
          </div>
        )}
      </div>

      <div className="rounded-md border border-sky-200 bg-sky-50/60 p-4 text-sm">
        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-700">
          Execution wallet
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-sky-600" />
          <span className="text-[13px] font-medium text-neutral-900">
            {data.wallet?.provider ?? "Turnkey"} org wallet
          </span>
        </div>
        <div className="mt-1 text-[11px] leading-snug text-neutral-600">
          Funds only tx workflow nodes; read-only calls do not need funding.
        </div>
      </div>

      <div className="rounded-md border border-neutral-200 bg-white p-4 text-sm">
        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
          Paid workflows · x402 ready
        </div>
        <ul className="mt-2 space-y-1">
          {data.catalog
            ?.filter((c) => c.paid)
            .slice(0, 3)
            .map((c) => (
              <li
                key={c.slug}
                className="flex items-center justify-between text-[11px]"
              >
                <span className="flex items-center gap-1 text-neutral-700">
                  <Zap className="h-3 w-3 text-amber-600" />
                  <code className="font-mono text-[11px]">{c.slug}</code>
                </span>
                <span className="font-mono text-neutral-500">
                  ${c.costUsdc?.toFixed(2)}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
