import type { Faq } from "@/lib/landing";

/**
 * Questions and answers as native disclosure rows. The answers are in the
 * page HTML whether open or closed, so search engines and AI assistants can
 * read every one. Pair with faqJsonLd() from lib/seo.
 */
export default function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="mt-6 divide-y divide-navy-100 border-y border-navy-100">
      {faqs.map((f) => (
        <details key={f.q} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-navy-900 [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              className="shrink-0 text-xl leading-none text-brand transition-transform group-open:rotate-45"
              aria-hidden
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy-700">
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}
