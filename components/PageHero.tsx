import Image from "next/image";
import Reveal from "@/components/Reveal";

/** Full-bleed image hero for interior pages. */
export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  compact = false,
}: {
  eyebrow: React.ReactNode;
  title: string;
  lead?: string;
  image: string;
  imageAlt?: string;
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <Image
        src={image}
        alt={imageAlt ?? ""}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/75 to-navy-950/35"
        aria-hidden
      />
      {/* top scrim keeps the floating menu legible over the hero image */}
      <div
        className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-navy-950/80 to-transparent"
        aria-hidden
      />
      <div
        className={`container-site relative flex flex-col justify-end pt-32 ${
          compact ? "min-h-[48vh] pb-16" : "min-h-[62vh] pb-20"
        }`}
      >
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <div className="rule" />
          {lead && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
              {lead}
            </p>
          )}
        </Reveal>
      </div>
      <div className="relative h-1 w-full bg-gradient-to-r from-brand via-brand to-transparent" />
    </section>
  );
}
