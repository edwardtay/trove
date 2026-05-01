/**
 * Server-side gate: renders BuyDecisionButton only when Privy is configured.
 * Without this, `useSignTypedData()` would throw on pages where the
 * PrivyProvider isn't mounted (since we conditionally wrap based on env).
 */
import BuyDecisionButton from "./BuyDecisionButton";

export default function BuyDecisionGate() {
  if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
    return null;
  }
  return <BuyDecisionButton />;
}
