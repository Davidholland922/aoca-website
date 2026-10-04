"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

/**
 * Google Analytics 4, loaded only after the visitor accepts. Until then no
 * Google script runs and no analytics cookie is set (Irish ePrivacy / GDPR).
 * The choice lives in localStorage; the privacy page offers a reset.
 */
export const GA_ID = "G-49HY36P2NJ";
const KEY = "aoca-consent";

type Choice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function resetConsent() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event("aoca-consent-reset"));
}

export default function CookieConsent() {
  // null = not yet read (server render), "ask" = show banner
  const [choice, setChoice] = useState<Choice | "ask" | null>(null);

  useEffect(() => {
    const sync = () => setChoice(readChoice() ?? "ask");
    sync();
    window.addEventListener("aoca-consent-reset", sync);
    return () => window.removeEventListener("aoca-consent-reset", sync);
  }, []);

  function decide(c: Choice) {
    try {
      localStorage.setItem(KEY, c);
    } catch {
      /* ignore */
    }
    setChoice(c);
  }

  return (
    <>
      {choice === "granted" && (
        <>
          <Script
            id="ga4-lib"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('consent', 'default', {analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'});
gtag('config', '${GA_ID}', {anonymize_ip: true});`}
          </Script>
        </>
      )}
      {choice === "ask" && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie choice"
          className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-xl border border-white/15 bg-navy-950 p-5 text-sm text-navy-100 shadow-2xl sm:inset-x-6 sm:bottom-6"
        >
          <p className="leading-relaxed">
            We use Google Analytics to see how the site is used so we can
            improve it. It only runs if you accept.{" "}
            <Link
              href="/privacy"
              className="font-medium text-white underline underline-offset-2"
            >
              Privacy policy
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="min-h-[44px] bg-brand px-5 font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Accept analytics
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="min-h-[44px] border border-white/25 px-5 font-semibold text-white transition-colors hover:border-white"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
