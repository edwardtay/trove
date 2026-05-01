"use client";

/**
 * Renders children only when wallet is connected (or disconnected).
 * Lets us hide brochure-y blocks once the user has a wallet attached,
 * and lets us show wallet-specific UI without it flashing for visitors.
 */
import type { ReactNode } from "react";
import { usePrivyWalletAddress } from "./usePrivyWalletAddress";

export default function WalletGate({
  showWhen,
  children,
}: {
  showWhen: "connected" | "disconnected";
  children: ReactNode;
}) {
  const address = usePrivyWalletAddress();
  const isConnected = Boolean(address);
  if (showWhen === "connected" && !isConnected) return null;
  if (showWhen === "disconnected" && isConnected) return null;
  return <>{children}</>;
}
