import Image from "next/image";

/**
 * Full-bleed drifting film strip of culture photos. Pure CSS animation
 * (pauses on hover); under prefers-reduced-motion the strip becomes a
 * static, horizontally scrollable row instead — see globals.css.
 * The photo list is duplicated once for a seamless loop.
 */
export default function CultureMarquee({ images }: { images: string[] }) {
  // vary the widths so the strip reads like a contact sheet, not a grid
  const widthFor = (i: number) =>
    ["w-52 sm:w-64", "w-40 sm:w-48", "w-64 sm:w-80"][i % 3];

  return (
    <div className="marquee group/marquee relative overflow-x-auto overflow-y-hidden">
      <div className="marquee-track flex w-max gap-4">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 gap-4"
            aria-hidden={copy === 1}
          >
            {images.map((src, i) => (
              <div
                key={src}
                className={`relative h-52 shrink-0 overflow-hidden sm:h-64 ${widthFor(i)}`}
              >
                <Image
                  src={src}
                  alt={copy === 0 ? "Life at AOCA" : ""}
                  fill
                  // first screenful loads eagerly so the strip never pops in
                  loading={copy === 0 && i < 8 ? "eager" : "lazy"}
                  sizes="20rem"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
