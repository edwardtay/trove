import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import PrivyClientProvider from "./PrivyClientProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const DEFAULT_SITE_URL = "https://trove.web3wagmi.com";

function getMetadataBase() {
  const deploymentUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    DEFAULT_SITE_URL;

  const normalized = deploymentUrl.startsWith("http")
    ? deploymentUrl
    : `https://${deploymentUrl}`;

  return new URL(normalized);
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: "Trove — earn the yield you're missing",
  description:
    "USDC yield agent on Base. Auto-claims reward tokens (1–3% per year you'd otherwise miss). Two-sided x402. iNFT identity on 0G. Built for ETHGlobal OpenAgents.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Trove · earn the yield you're missing",
    description:
      "USDC yield agent on Base. Auto-claims reward tokens. Two-sided x402. iNFT on 0G.",
    url: "/",
    type: "website",
    siteName: "Trove",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Trove — earn the yield you're missing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trove · earn the yield you're missing",
    description:
      "USDC yield agent on Base. Auto-claims reward tokens. Two-sided x402.",
    images: [
      {
        url: "/opengraph-image",
        alt: "Trove — earn the yield you're missing",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const wrapped = privyAppId ? (
    <PrivyClientProvider appId={privyAppId}>{children}</PrivyClientProvider>
  ) : (
    children
  );

  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">{wrapped}</body>
    </html>
  );
}
