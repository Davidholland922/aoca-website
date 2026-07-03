import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site, offices } from "@/lib/site";

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
    default: `${site.name} | Consulting Engineers, Ireland & UK`,
    template: `%s | ${site.shortName} Engineering Consultants`,
  },
  description:
    "Aidan O'Connell & Associates — civil & structural engineering, insurance engineering, pyrite remediation and consulting engineers since 1996. Offices in Portlaoise, Dublin and Manchester.",
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Consulting Engineers, Ireland & UK`,
    description:
      "We turn vision into reality. Over 7,000 projects delivered since 1996 across Ireland, the UK and Europe.",
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
  legalName: site.legalName,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  foundingDate: site.founded,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lismard House, Timahoe Road",
    addressLocality: "Portlaoise",
    addressRegion: "Co. Laois",
    addressCountry: "IE",
  },
  location: offices.map((o) => ({
    "@type": "Place",
    name: o.name,
    address: o.address.join(", "),
  })),
  areaServed: ["Ireland", "United Kingdom"],
  description:
    "Civil & structural engineering, insurance engineering, pyrite remediation and consulting engineering services since 1996.",
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
