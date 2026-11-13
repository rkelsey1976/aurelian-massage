"use client";

import { useEffect } from "react";

import {
  COOKIE_CONSENT_EVENT,
  readCookieConsent,
  type CookieConsentChoice,
} from "@/components/marketing/cookie-banner";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function injectGoogleAnalytics(measurementId: string) {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (document.getElementById("ga-gtag-js")) return;

  window.dataLayer = window.dataLayer ?? [];
  // gtag.js only treats an `arguments` object in dataLayer as a command. Pushing a
  // plain array (e.g. from `...args`) is silently ignored, so no config and no
  // page_view are ever sent. Keep `arguments` here.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  // User has already accepted analytics via the cookie banner ("Accept all cookies").
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    anonymize_ip: true,
  });

  const script = document.createElement("script");
  script.id = "ga-gtag-js";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

/**
 * Loads Google Analytics (gtag.js) only after the user chooses "Accept all cookies"
 * in the cookie banner. Set NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX) in Netlify.
 */
export function ConsentGatedGoogleAnalytics() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID?.trim()) return;

    const loadIfAllowed = (choice: CookieConsentChoice | null) => {
      if (choice === "all") {
        injectGoogleAnalytics(GA_MEASUREMENT_ID.trim());
      }
    };

    loadIfAllowed(readCookieConsent());

    const onConsent = (event: Event) => {
      const custom = event as CustomEvent<CookieConsentChoice>;
      loadIfAllowed(custom.detail);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent);
  }, []);

  return null;
}
