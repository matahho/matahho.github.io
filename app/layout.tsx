import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://matahho.github.io"),
  title: "Mahdi Haji — Reliability of Distributed Systems",
  description:
    "Mahdi Haji — systems researcher building self-verifying distributed software. Incoming PhD at the University of Oxford.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Mahdi Haji",
    description:
      "Systems researcher building self-verifying distributed software. Incoming PhD at the University of Oxford.",
    url: "https://matahho.github.io",
    siteName: "Mahdi Haji",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
