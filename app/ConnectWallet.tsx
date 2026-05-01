import { Wallet } from "lucide-react";
import ConnectWalletPrivy from "./ConnectWalletPrivy";

/**
 * Server component shell. Branches on NEXT_PUBLIC_PRIVY_APP_ID:
 *   - configured  → renders the live Privy connect button
 *   - unconfigured → renders an inert placeholder with a setup hint
 *
 * The Privy provider itself is wrapped at the layout level (also conditional).
 */
export default function ConnectWallet() {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!appId) {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-hairline bg-subtle px-3 py-1.5 text-[11px] text-ink-faint"
        title="Wallet connect requires NEXT_PUBLIC_PRIVY_APP_ID in .env.local. The site is fully usable read-only — paste any Base address below."
      >
        <Wallet className="h-3.5 w-3.5" aria-hidden />
        read-only mode
      </span>
    );
  }

  return <ConnectWalletPrivy />;
}
