"use client"; // Keep 'use client'

import { MetaMaskProvider } from "@metamask/sdk-react";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sdkOptions = {
    dappMetadata: {
      name: '4V4: Avatar Generator',
      url: typeof window !== 'undefined' ? window.location.href : 'http://localhost:3000',
    },
  };

  return (
    <MetaMaskProvider sdkOptions={sdkOptions}>
      {children}
    </MetaMaskProvider>
  );
}