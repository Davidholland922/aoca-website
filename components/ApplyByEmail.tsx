"use client";

import { useState } from "react";
import { ArrowRight, Check, Copy, Mail } from "lucide-react";

/**
 * "Send us your CV" button that works on every device.
 *
 * A bare mailto: link does nothing on a computer with no mail app set up,
 * which is most office PCs and many laptops, so the button looked broken.
 * This still opens the mail app where one exists, but it also shows the
 * address, a copy button and a ready-made subject line so the applicant can
 * send the CV from webmail or their phone instead.
 */
export default function ApplyByEmail({
  email,
  subject,
  label,
  className = "btn-primary",
}: {
  email: string;
  subject: string;
  label: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the address is still shown as text */
    }
  }

  return (
    <div className="w-fit">
      <a
        href={mailto}
        className={className}
        onClick={() => setOpen(true)}
        aria-expanded={open}
      >
        {label}
        <ArrowRight size={16} aria-hidden />
      </a>
      {open && (
        <div
          className="mt-4 max-w-md border border-navy-200 bg-white p-5 text-sm text-navy-700 shadow-lg"
          role="status"
        >
          <p className="font-semibold text-navy-900">
            Email your CV to
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <code className="select-all border border-navy-100 bg-navy-50 px-3 py-2 text-base text-navy-900">
              {email}
            </code>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 border border-navy-800 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-navy-900 transition-colors hover:bg-navy-900 hover:text-white"
            >
              {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
              {copied ? "Copied" : "Copy address"}
            </button>
          </div>
          <p className="mt-3 text-navy-600">
            Subject line: <span className="text-navy-900">{subject}</span>. Attach your CV as a PDF or Word document.
          </p>
          <p className="mt-3">
            <a href={mailto} className="inline-flex items-center gap-1.5 font-medium text-brand underline-offset-2 hover:underline">
              <Mail size={14} aria-hidden />
              Open in your email app
            </a>
            <span className="text-navy-400"> (if nothing opens, copy the address and use webmail or your phone)</span>
          </p>
        </div>
      )}
    </div>
  );
}
