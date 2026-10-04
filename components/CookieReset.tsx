"use client";

import { resetConsent } from "@/components/CookieConsent";

/** "Change your cookie choice" link for the privacy page. */
export default function CookieReset() {
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="font-medium text-brand underline-offset-2 hover:underline"
    >
      change your cookie choice
    </button>
  );
}
