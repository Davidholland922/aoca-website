import Image from "next/image";
import clsx from "clsx";
import Swoosh from "@/components/Swoosh";

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={clsx("max-w-2xl", center && "mx-auto text-center")}>
      <p
        className={clsx(
          "eyebrow flex items-center gap-2",
          center && "justify-center"
        )}
      >
        {/* the red 'A' from the AOCA mark, used as a brand accent */}
        <Image
          src="/a-mark.png"
          alt=""
          width={151}
          height={150}
          className="h-3.5 w-auto"
          aria-hidden
        />
        {eyebrow}
      </p>
      <h2
        className={clsx(
          "mt-3 text-3xl font-semibold sm:text-4xl",
          dark ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      <Swoosh className={clsx(center && "mx-auto")} />
      {lead && (
        <p
          className={clsx(
            "mt-5 text-base leading-relaxed sm:text-lg",
            dark ? "text-navy-100" : "text-navy-600"
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
