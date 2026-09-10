"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

/**
 * Posts to /api/contact (Resend → info@aoca.ie + info@aoca.co.uk once
 * RESEND_API_KEY is configured; simulated on the draft until then).
 */
export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "simulated" | "error"
  >("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      const out = (await res.json()) as { simulated?: boolean };
      setStatus(out.simulated ? "simulated" : "sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent" || status === "simulated") {
    return (
      <div
        className="flex flex-col items-center border border-navy-100 bg-navy-50/50 px-8 py-16 text-center"
        role="status"
      >
        <CheckCircle2 size={44} className="text-brand" aria-hidden />
        <h3 className="mt-5 text-xl font-semibold text-navy-900">
          Thanks — message received.
        </h3>
        <p className="mt-2 max-w-sm text-navy-600">
          An engineer will come back to you within one working day.
        </p>
        {status === "simulated" && (
          <p className="mt-4 text-xs uppercase tracking-wider text-navy-400">
            (Draft note: email delivery not yet switched on)
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-navy-800">
          Name <span className="text-brand">*</span>
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="min-h-[48px] border border-navy-200 bg-white px-4 text-navy-900 placeholder:text-navy-300 focus:border-navy-800"
          placeholder="Your name"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-sm font-medium text-navy-800">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="min-h-[48px] border border-navy-200 bg-white px-4 text-navy-900 placeholder:text-navy-300 focus:border-navy-800"
          placeholder="087 123 4567"
        />
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="email" className="text-sm font-medium text-navy-800">
          Email <span className="text-brand">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="min-h-[48px] border border-navy-200 bg-white px-4 text-navy-900 placeholder:text-navy-300 focus:border-navy-800"
          placeholder="you@example.ie"
        />
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="message" className="text-sm font-medium text-navy-800">
          Tell us about the project <span className="text-brand">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="border border-navy-200 bg-white px-4 py-3 text-navy-900 placeholder:text-navy-300 focus:border-navy-800"
          placeholder="Site location, what you're planning, and where things currently stand…"
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <Send size={15} aria-hidden />
        </button>
        {status === "error" && (
          <p className="mt-3 text-sm text-brand" role="alert">
            Something went wrong sending your message — please try again, or
            call us on +353 (0)57 866 3244.
          </p>
        )}
      </div>
    </form>
  );
}
