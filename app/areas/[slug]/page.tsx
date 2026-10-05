import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { countyLandings, getCountyLanding, LANDING_LIVE } from "@/lib/landing";
import { CountyLandingView } from "@/components/LandingPage";

/** County pages: see lib/landing.ts. Hidden until LANDING_LIVE is true. */
export function generateStaticParams() {
  return countyLandings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const l = getCountyLanding((await params).slug);
  if (!l) return {};
  return {
    title: l.metaTitle,
    description: l.metaDescription,
    alternates: { canonical: `/areas/${l.slug}` },
    openGraph: { images: [l.image] },
    robots: LANDING_LIVE ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default async function CountyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const l = getCountyLanding((await params).slug);
  if (!l) notFound();
  return <CountyLandingView l={l} />;
}
