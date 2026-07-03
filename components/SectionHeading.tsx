import clsx from "clsx";

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
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={clsx(
          "mt-3 text-3xl font-semibold sm:text-4xl",
          dark ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      <div className={clsx("rule", center && "mx-auto")} />
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
