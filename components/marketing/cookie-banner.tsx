"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const COOKIE_CONSENT_STORAGE_KEY = "aurelian_cookie_consent";

export type CookieConsentChoice = "all" | "essential";

/**
 * Fires on window when user saves a choice (for optional analytics loaders).
 */
export const COOKIE_CONSENT_EVENT = "aurelian:cookie-consent";

export function readCookieConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { choice?: CookieConsentChoice };
    return parsed.choice === "all" || parsed.choice === "essential" ? parsed.choice : null;
  } catch {
    return null;
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setVisible(readCookieConsent() === null);
  }, []);

  const saveChoice = (choice: CookieConsentChoice) => {
    try {
      localStorage.setItem(
        COOKIE_CONSENT_STORAGE_KEY,
        JSON.stringify({ choice, savedAt: Date.now() }),
      );
    } catch {
      /* ignore quota / private mode */
    }
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: choice }));
    setVisible(false);
  };

  if (!mounted || !visible) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div
        className="pointer-events-auto w-full max-w-4xl rounded-2xl px-5 py-5 shadow-2xl sm:px-8 sm:py-6"
        style={{
          background: "#2C1E42",
          border: "1px solid rgba(197, 165, 86, 0.28)",
          boxShadow: "0 -8px 40px rgba(32, 21, 46, 0.65), 0 0 0 1px rgba(122, 80, 176, 0.15)",
        }}
      >
        <h2
          id="cookie-banner-title"
          className="font-serif text-lg font-semibold text-neutral-light sm:text-xl"
        >
          Cookies &amp; your privacy
        </h2>
        <p
          id="cookie-banner-desc"
          className="mt-3 text-sm leading-7 text-neutral-mid sm:text-[0.9375rem] sm:leading-8"
        >
          We use essential cookies so the site works (for example, remembering this choice). If you
          choose <strong className="text-neutral-light">Accept all cookies</strong>, we load{" "}
          <strong className="text-neutral-light">Google Analytics</strong> to understand how the site is
          used (aggregated statistics). We never load Google Analytics if you choose essential cookies only.
          See our{" "}
          <Link
            href="/privacy"
            className="font-medium text-gold-accent underline decoration-gold-accent/40 underline-offset-2 transition-colors hover:decoration-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent rounded"
          >
            Privacy &amp; cookies
          </Link>{" "}
          page for details.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={() => saveChoice("essential")}
            className="order-2 w-full rounded-full border border-gold-accent/50 px-5 py-3 text-sm font-semibold text-neutral-mid transition-all duration-200 hover:border-gold-accent hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#2C1E42] sm:order-1 sm:w-auto"
          >
            Essential cookies only
          </button>
          <button
            type="button"
            onClick={() => saveChoice("all")}
            className="order-1 w-full rounded-full px-5 py-3 text-sm font-semibold text-purple-dark transition-all duration-200 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#2C1E42] sm:order-2 sm:w-auto"
            style={{
              background: "#C5A556",
              boxShadow: "0 0 20px rgba(197,165,86,0.25)",
            }}
          >
            Accept all cookies
          </button>
        </div>
      </div>
    </div>
  );
}
