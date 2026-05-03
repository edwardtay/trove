/**
 * /agent/<ens-name> — universal agent profile page.
 *
 * Treats ENS as the canonical address book for agents on Trove. Any ENS
 * name with a Trove-compatible text record set (x402-endpoint, 0g-inft,
 * or 0g-storage-policy) renders as a discoverable agent card.
 *
 * Route examples:
 *   /agent/trove.web3wagmi.eth
 *   /agent/agent-0.trove.web3wagmi.eth
 *   /agent/some-other-team.eth      (if they implement Trove's record schema)
 *
 * Demonstrates ENS-as-discovery: no central registry, no API key, no
 * signed handshake. Anyone publishing the schema becomes Trove-compatible.
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Server, Cpu, Database, Code2 } from "lucide-react";
import { discoverAgent } from "../../../src/agent-ens";
import Logo from "../../Logo";

export const revalidate = 60;

type Props = { params: Promise<{ name: string }> };

export async function generateMetadata({ params }: Props) {
  const { name } = await params;
  return {
    title: `${decodeURIComponent(name)} · Trove agent profile`,
    description: `ENS-discoverable agent profile resolved from on-chain text records.`,
  };
}

export default async function AgentByNamePage({ params }: Props) {
  const { name: encoded } = await params;
  const name = decodeURIComponent(encoded);

  if (!name.endsWith(".eth")) {
    notFound();
  }

  const profile = await discoverAgent(name).catch(() => null);

  return (
    <main className="mx-auto max-w-4xl px-6 pb-14 pt-6">
      <header className="mb-8 flex items-center justify-between border-b border-hairline pb-5">
        <Link href="/" className="group inline-flex items-center gap-2.5">
          <Logo size={24} />
          <span className="text-sm text-ink-subtle group-hover:text-ink">
            ← Trove
          </span>
        </Link>
        <a
          href={`https://app.ens.domains/${name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[11px] text-ink-faint underline-offset-2 hover:text-ink hover:underline"
        >
          view on ENS
          <ExternalLink className="h-3 w-3" />
        </a>
      </header>

      <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
        <span className="h-px w-6 bg-rule" aria-hidden />
        ENS-resolved agent profile
      </div>
      <h1 className="font-mono text-[36px] font-semibold leading-tight tracking-crunched text-ink">
        {name}
      </h1>

      {profile ? (
        <>
          {profile.description && (
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.65] text-ink-muted">
              {profile.description}
            </p>
          )}

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {profile.address && (
              <Field
                label="Address"
                value={profile.address}
                href={`https://basescan.org/address/${profile.address}`}
                hrefLabel="basescan"
              />
            )}
            {profile.x402Endpoint && (
              <Field
                label="x402 endpoint"
                icon={<Server className="h-3.5 w-3.5" />}
                value={profile.x402Endpoint}
                href={profile.x402Endpoint}
                hrefLabel="POST"
              />
            )}
            {profile.ogInft && (
              <Field
                label="0G iNFT"
                icon={<Cpu className="h-3.5 w-3.5" />}
                value={profile.ogInft}
                hint="chainId:contract:tokenId"
              />
            )}
            {profile.ogStoragePolicy && (
              <Field
                label="Policy hash · 0G Storage"
                icon={<Database className="h-3.5 w-3.5" />}
                value={profile.ogStoragePolicy}
              />
            )}
            {profile.ogMemory && (
              <Field
                label="Memory hash · 0G Storage"
                icon={<Database className="h-3.5 w-3.5" />}
                value={profile.ogMemory}
              />
            )}
            {profile.github && (
              <Field
                label="Source code"
                icon={<Code2 className="h-3.5 w-3.5" />}
                value={profile.github}
                href={`https://github.com/${profile.github}`}
                hrefLabel="github"
              />
            )}
            {profile.url && (
              <Field
                label="Website"
                value={profile.url}
                href={profile.url}
                hrefLabel="open"
              />
            )}
          </div>

          <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
              How this resolves
            </div>
            <p className="mt-2 text-[13px] leading-[1.6] text-emerald-900/80">
              This page reads ENS text records from L1 mainnet via viem.
              No central directory, no API key. Any ENS name that publishes
              the records (<code className="font-mono text-[12px]">x402-endpoint</code>,{" "}
              <code className="font-mono text-[12px]">0g-inft</code>,{" "}
              <code className="font-mono text-[12px]">0g-memory</code>, etc.)
              becomes a Trove-compatible agent. See{" "}
              <Link
                href="/notes"
                className="underline-offset-2 hover:underline"
              >
                /notes
              </Link>{" "}
              for the schema.
            </p>
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-hairline bg-subtle p-5 text-[13px] text-ink-muted">
          <strong>{name}</strong> resolves on ENS but doesn&apos;t publish
          the Trove agent schema. To become Trove-compatible, set at least
          one of these text records:{" "}
          <code className="font-mono text-[12px]">x402-endpoint</code>,{" "}
          <code className="font-mono text-[12px]">0g-inft</code>. See{" "}
          <Link href="/notes" className="underline-offset-2 hover:underline">
            /notes
          </Link>{" "}
          for the full schema.
        </div>
      )}
    </main>
  );
}

function Field({
  label,
  value,
  href,
  hrefLabel,
  icon,
  hint,
}: {
  label: string;
  value: string;
  href?: string;
  hrefLabel?: string;
  icon?: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-hairline bg-paper p-4">
      <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
        {icon}
        {label}
      </div>
      <div className="break-all font-mono text-[12px] text-ink">{value}</div>
      <div className="mt-1.5 flex items-center justify-between text-[10px] text-ink-faint">
        {hint ? <span className="font-mono">{hint}</span> : <span />}
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 underline-offset-2 hover:underline"
          >
            {hrefLabel ?? "open"}
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        )}
      </div>
    </div>
  );
}
