import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteMain } from "@/components/layout/SiteMain";
import { Toaster } from "@/components/ui/Toaster";
import { LanguageProvider } from "@/hooks/useLanguage";

export const metadata: Metadata = {
  title: "Fundi3 — Web3, Finally Clear.",
  description:
    "La première plateforme Web3 conçue pour l'Afrique. Apprenez la blockchain, le DeFi et les smart contracts en français et en anglais.",
  keywords: [
    "Web3",
    "blockchain",
    "Africa",
    "DeFi",
    "NFT",
    "Solana",
    "education",
    "Cameroon",
  ],
  authors: [{ name: "Fundi3" }],
  openGraph: {
    title: "Fundi3 — Web3, Finally Clear.",
    description:
      "The first Web3 education platform built for francophone Africa.",
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    siteName: "Fundi3",
  },
  twitter: {
    card: "summary_large_image",
    site: "@fundi3hq",
    creator: "@fundi3hq",
  },
  icons: {
    icon: "/favicon.svg",
  },
  themeColor: "#0A0F0E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-body antialiased bg-dark text-off-white">
        <NextTopLoader
          color="linear-gradient(to right, #0F6E56, #1D9E75, #EF9F27)"
          height={3}
          showSpinner={false}
          shadow="0 0 10px #1D9E75, 0 0 5px #EF9F27"
        />
        <LanguageProvider>
          <Navbar />
          <SiteMain>{children}</SiteMain>
          <Footer />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
