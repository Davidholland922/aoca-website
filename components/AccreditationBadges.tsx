import { BadgeCheck } from "lucide-react";
import { accreditations } from "@/lib/site";

/**
 * Accreditation badges styled as logo-cards. When AOCA supply the official
 * membership logo files, drop them in public/images/accreditations/ and swap
 * the monogram block for an <Image> — see PLACEHOLDERS.md.
 */
export default function AccreditationBadges({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={`grid gap-3 ${
        compact
          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          : "sm:grid-cols-2 lg:grid-cols-5"
      }`}
    >
      {accreditations.map((a) => {
        // monogram from the organisation's initials
        const mono = a
          .replace(/^(Member of the?|Corporate Member of|Member of)\s+/i, "")
          .split(/\s+/)
          .filter((w) => /^[A-Z0-9]/.test(w))
          .slice(0, 3)
          .map((w) => (/\d/.test(w) ? w.replace(/[^A-Z0-9]/gi, "") : w[0]))
          .join("");
        return (
          <div
            key={a}
            className="flex h-full flex-col items-center border border-navy-100 bg-white p-5 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center border-2 border-navy-900 font-heading text-sm font-bold text-navy-900">
              {mono.slice(0, 5)}
            </span>
            <p className="mt-3 flex-1 text-xs font-medium leading-snug text-navy-700">
              {a}
            </p>
            <BadgeCheck size={15} className="mt-2 text-brand" aria-hidden />
          </div>
        );
      })}
    </div>
  );
}
