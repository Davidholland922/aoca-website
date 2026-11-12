"use client";

import { useRef, useState } from "react";
import Script from "next/script";
import { Send, CheckCircle2 } from "lucide-react";

/**
 * Sends enquiries straight from the visitor's browser to Web3Forms, using
 * the access key(s) the client pasted in /admin. Web3Forms' free plan
 * rejects server-side submissions, so this must stay client-side (the keys
 * are public by design — they can only deliver mail TO the linked inbox).
 * With no key saved it falls back to /api/contact, which simulates.
 *
 * Spam defence, three layers:
 *  1. hCaptcha "I am human" box, verified by Web3Forms itself (their public
 *     site key), so a submission without a valid token is refused upstream.
 *  2. A hidden honeypot field that only automated form-fillers tick.
 *  3. A timing check: nobody real completes the form in under three seconds.
 * Bots are told "message received" so they move on; nothing is sent.
 */
const HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2"; // Web3Forms' shared key
const MIN_SECONDS = 3;

declare global {
  interface Window {
    hcaptcha?: {
      render: (el: HTMLElement, opts: Record<string, string>) => string;
      getResponse: (id?: string) => string;
      reset: (id?: string) => void;
    };
  }
}

export default function ContactForm({
  accessKeys = [],
}: {
  /** primary inbox first (info@aoca.ie), optional copy second */
  accessKeys?: string[];
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "simulated" | "error" | "captcha" | "saved"
  >("idle");
  const lastData = useRef<Record<string, string> | null>(null);
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const mountedAt = useRef(Date.now());

  // runs when the hCaptcha script is ready, and again on every remount
  // (client-side navigation back to /contact) when the script is cached
  function renderCaptcha() {
    const el = captchaRef.current;
    if (!el || el.hasChildNodes() || !window.hcaptcha) return;
    try {
      widgetId.current = window.hcaptcha.render(el, {
        sitekey: HCAPTCHA_SITEKEY,
        theme: "light",
      });
    } catch {
      /* widget unavailable: the form still works, Web3Forms accepts without it */
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;
    // copy for the admin "Enquiries" tab; failed sends are flagged there so
    // no real enquiry is ever lost, whatever happens to the email
    const record = (delivered: boolean) =>
      fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, delivered }),
        keepalive: true,
      })
        .then((r) => r.ok)
        .catch(() => false);
    lastData.current = data;
    try {
      // hidden honeypot: real people never tick it, bots usually do
      const isBot = !!data.botcheck;
      // implausibly fast (autofill + paste can do it): not emailed, but kept
      // in the Enquiries tab, flagged, so a real person is never lost
      const tooFast = Date.now() - mountedAt.current < MIN_SECONDS * 1000;
      delete data.botcheck;
      const token =
        (widgetId.current !== null && window.hcaptcha
          ? window.hcaptcha.getResponse(widgetId.current)
          : "") || data["h-captcha-response"] || "";
      delete data["h-captcha-response"];
      delete data["g-recaptcha-response"];

      if (isBot) {
        setStatus("sent"); // tell the bot it worked; send nothing
        return;
      }
      if (tooFast) {
        await record(false);
        setStatus("sent");
        return;
      }
      // the box rendered but was not ticked
      if (captchaRef.current?.hasChildNodes() && !token) {
        setStatus("captcha");
        return;
      }
      setStatus("sending");

      if (accessKeys.length) {
        const results = await Promise.all(
          accessKeys.map((access_key) =>
            fetch("https://api.web3forms.com/submit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                access_key,
                subject: `Website enquiry from ${data.name} (${data.email})`,
                from_name: "AOCA Website",
                replyto: data.email,
                // shown in the notification body: a fresh email avoids the
                // quoted notification that spam filters dislike
                how_to_reply: `Start a new email to ${data.email}. Replying to this notification can land in the sender's spam folder.`,
                ...(token ? { "h-captcha-response": token } : {}),
                ...data,
              }),
            })
              .then((r) => r.json() as Promise<{ success?: boolean }>)
              .catch(() => ({ success: false }))
          )
        );
        // delivered if the main inbox (info@aoca.ie) got it
        const delivered = !!results[0]?.success;
        if (!delivered) throw new Error("send failed");
        void record(true);
        setStatus("sent");
        window.gtag?.("event", "generate_lead", { method: "contact_form" });
        return;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      const out = (await res.json()) as { simulated?: boolean };
      setStatus(out.simulated ? "simulated" : "sent");
    } catch {
      // a used or expired captcha token cannot be sent twice
      if (widgetId.current !== null) window.hcaptcha?.reset(widgetId.current);
      setStatus((await record(false)) ? "saved" : "error");
    }
  }

  const mailto = (() => {
    const d = lastData.current;
    const body = d
      ? `Name: ${d.name ?? ""}\nPhone: ${d.phone ?? ""}\n\n${d.message ?? ""}`
      : "";
    return `mailto:info@aoca.ie?subject=${encodeURIComponent(
      "Website enquiry"
    )}&body=${encodeURIComponent(body)}`;
  })();

  if (status === "saved") {
    return (
      <div
        className="flex flex-col items-center border border-navy-100 bg-navy-50/50 px-8 py-16 text-center"
        role="status"
      >
        <CheckCircle2 size={44} className="text-brand" aria-hidden />
        <h3 className="mt-5 text-xl font-semibold text-navy-900">
          Thanks — we have your message.
        </h3>
        <p className="mt-2 max-w-sm text-navy-600">
          Our email system had a hiccup, but your enquiry has been saved and
          an engineer will come back to you within one working day.
        </p>
        <a href={mailto} className="btn-outline-dark mt-6">
          Or email it to info@aoca.ie
        </a>
      </div>
    );
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
      <Script
        src="https://js.hcaptcha.com/1/api.js?recaptchacompat=off&render=explicit"
        strategy="lazyOnload"
        onReady={renderCaptcha}
      />
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
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
        {/* hCaptcha renders its "I am human" box here */}
        <div
          ref={captchaRef}
          className="min-h-[1px]"
          aria-label="Spam protection check"
        />
        {status === "captcha" && (
          <p className="mt-3 text-sm text-brand" role="alert">
            Please tick the “I am human” box above before sending.
          </p>
        )}
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
            Something went wrong sending your message. Please{" "}
            <a href={mailto} className="font-semibold underline">
              email it to info@aoca.ie
            </a>{" "}
            (your message is filled in for you) or call us on +353 (0)57 866
            3244.
          </p>
        )}
      </div>
    </form>
  );
}
