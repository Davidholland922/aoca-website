import Link from "next/link";
import Image from "next/image";
import { sectors, type Project } from "@/lib/site";

/** Static project card (same look as the explorer grid, no motion). */
export default function ProjectCard({
  p,
  headingLevel = "h3",
}: {
  p: Project;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const sector = sectors.find((s) => s.slug === p.sector)?.title;
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group block h-full border border-navy-100 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-navy-800 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={p.thumb}
          alt={`${p.title}${p.location ? `, ${p.location}` : ""}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy-950/60 to-transparent"
          aria-hidden
        />
        {sector && (
          <span className="absolute bottom-3 left-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            {sector}
          </span>
        )}
      </div>
      <div className="p-6">
        <H className="text-lg font-semibold text-navy-900 group-hover:text-brand">
          {p.title}
        </H>
        {p.location && (
          <p className="mt-1 text-xs uppercase tracking-wider text-navy-500">
            {p.location}
          </p>
        )}
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-navy-600">
          {p.summary}
        </p>
      </div>
    </Link>
  );
}
