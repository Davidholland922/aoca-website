import Image from "next/image";
import clsx from "clsx";

/**
 * Giant ghosted A-mark used as a background brand watermark on dark
 * sections. Decorative only.
 */
export default function AWatermark({ className }: { className?: string }) {
  return (
    <Image
      src="/a-mark.png"
      alt=""
      width={604}
      height={600}
      aria-hidden
      className={clsx(
        "pointer-events-none absolute select-none opacity-[0.07]",
        className ?? "-right-24 top-1/2 h-[130%] w-auto -translate-y-1/2"
      )}
    />
  );
}
