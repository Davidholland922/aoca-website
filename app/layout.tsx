import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { site } from "@/lib/site";
import { orgJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Consulting Engineers Portlaoise, Dublin & Manchester | AOCA Engineering Consultants",
    template: `%s | ${site.shortName}`,
  },
  description:
    "Civil, structural, insurance and forensic engineers since 1996. Offices in Portlaoise, Dublin and Manchester. 38 case studies, 9 areas of expertise.",
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Consulting Engineers, Ireland & UK`,
    description:
      "We turn vision into reality. Over 7,000 projects delivered since 1996 across Ireland, the UK and Europe.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${heading.variable} ${body.variable}`}
    >
      <body>
        <JsonLd data={orgJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
