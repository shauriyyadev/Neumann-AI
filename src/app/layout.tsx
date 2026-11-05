import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";
import { SITE_URL } from "@/lib/site";

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "400 700",
});

const playfair = localFont({
  src: [
    {
      path: "./fonts/playfair-latin.woff2",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "./fonts/playfair-italic-latin.woff2",
      weight: "400 900",
      style: "italic",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = localFont({
  src: "./fonts/jetbrains-latin.woff2",
  variable: "--font-jetbrains",
  display: "swap",
  weight: "400 700",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Neumann — AI agents for support, finance",
    template: "%s — Neumann",
  },
  description:
    "Neumann deploys AI agents that execute real operational work across the tools you already use — with permissions, human approvals, and a full execution history.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    siteName: "Neumann",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary" },
};

const boot = `document.documentElement.classList.add('js');`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
        <SiteEffects />
      </body>
    </html>
  );
}
