import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
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

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://matahho.github.io"),
  title: "Mahdi Haji · bio = model(mahdi.data)",
  description:
    "Mahdi Haji, DPhil (PhD) student in Computer Science at the University of Oxford, working on reliable distributed systems and AI infrastructure.",
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
      "DPhil (PhD) student in Computer Science at the University of Oxford, working on reliable distributed systems and AI infrastructure.",
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
    <html lang="en" className={`${body.variable} ${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
