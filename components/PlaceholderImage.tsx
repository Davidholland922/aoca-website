import clsx from "clsx";

/**
 * Tasteful stand-in for real project photography, styled as an engineering
 * drawing so the draft still looks intentional. Swap for <Image> once AOCA
 * supply photos — see PLACEHOLDERS.md.
 */
export default function PlaceholderImage({
  label,
  sector,
  className,
}: {
  label: string;
  sector?: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "blueprint relative flex items-center justify-center overflow-hidden bg-navy-900",
        className
      )}
      role="img"
      aria-label={`Placeholder image: ${label}`}
    >
      <svg
        viewBox="0 0 400 260"
        className="absolute inset-0 h-full w-full opacity-40"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        {/* abstract structural line-work */}
        <g stroke="#8FB1C0" strokeWidth="1" fill="none">
          <path d="M40 220 L120 90 L200 220 Z" />
          <path d="M120 90 L120 220" />
          <path d="M160 155 L280 155 L280 220 L160 220" />
          <path d="M280 155 L340 100 L340 220" />
          <circle cx="120" cy="90" r="5" />
          <circle cx="340" cy="100" r="5" />
        </g>
        <g stroke="#C8202F" strokeWidth="1.5" fill="none">
          <path d="M30 232 L370 232" />
          <path d="M30 226 L30 238 M370 226 L370 238" />
        </g>
      </svg>
      <div className="relative px-6 text-center">
        {sector && (
          <p className="eyebrow !text-navy-300">{sector}</p>
        )}
        <p className="mt-1 font-heading text-sm font-medium uppercase tracking-widest text-white/70">
          {label}
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
          Photo placeholder
        </p>
      </div>
    </div>
  );
}
