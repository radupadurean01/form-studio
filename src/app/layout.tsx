import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Caveat } from "next/font/google";
import "./globals.css";
import { BlobDefs } from "@/components/blob-defs";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://formstudio.ro"
  ),
  title: "Form Studio",
  description:
    "Form Studio este un spațiu gândit pentru oameni care vor să se miște bine, să se simtă bine și să nu fie judecați.",
  icons: {
    icon: [
      { url: "/images/logo-mark-gold.svg", type: "image/svg+xml" },
      { url: "/images/favicon.png", type: "image/png" },
    ],
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${cormorant.variable} ${outfit.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <BlobDefs />
        {children}
      </body>
    </html>
  );
}
