import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

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
    default: `${site.name} | Civil & Structural Engineers, Ireland`,
    template: `%s | ${site.shortName} Engineering Consultants`,
  },
  description:
    "AOCA Engineering Consultants — civil & structural engineering, project management, Assigned Certifier and site development services across Ireland.",
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Civil & Structural Engineers, Ireland`,
    description:
      "Engineering certainty, from the ground up. Civil & structural design, project management and building-control compliance across Ireland.",
    images: ["/aoca-logo-colour.png"],
  },
  robots: {
    // Draft site: keep out of search indexes until production launch
    index: false,
    follow: false,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressCountry: "IE",
  },
  areaServed: "Ireland",
  description:
    "Civil & structural engineering, project management, Assigned Certifier and site development services.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
