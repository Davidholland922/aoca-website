import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { insights, getArticle } from "@/lib/insights";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";

export function generateStaticParams() {
  return insights.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const more = insights.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={
          <>
            <Link href="/insights" className="hover:text-brand-light">
              Insights
            </Link>{" "}
            / {article.displayDate}
          </>
        }
        title={article.title}
        image={article.image}
        imageAlt=""
        compact
      />

      <article className="section bg-white">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="space-y-6">
                {article.body.map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-xl leading-relaxed text-navy-800"
                        : "leading-relaxed text-navy-700"
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>
              <p className="mt-10 border-t border-navy-100 pt-6 text-sm text-navy-500">
                Published {article.displayDate} · AOCA Engineering Consultants
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-20 border-t border-navy-100 pt-12">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-2xl font-semibold text-navy-900">
                  More insights
                </h2>
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand hover:text-brand-dark"
                >
                  All insights
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {more.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/insights/${a.slug}`}
                    className="group block border border-navy-100 transition-all duration-200 hover:-translate-y-1 hover:border-navy-800 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={a.image}
                        alt={a.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 640px) 33vw, 100vw"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs uppercase tracking-wider text-navy-400">
                        {a.displayDate}
                      </p>
                      <h3 className="mt-1 font-semibold leading-snug text-navy-900 group-hover:text-brand">
                        {a.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      <CtaBand />
    </>
  );
}
