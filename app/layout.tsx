import type { ReactNode } from "react";
import type { Metadata } from "next";
import { JetBrains_Mono, Literata, Space_Grotesk } from "next/font/google";

import "./globals.css";

const fontSans = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

const fontSerif = Literata({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "JS Dev Docs",
    template: "%s | JS Dev Docs",
  },
  description:
    "Migration-safe multilingual JavaScript learning platform built from preserved Ukrainian lesson content.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} bg-paper text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
