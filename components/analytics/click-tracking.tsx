"use client";

import { useEffect } from "react";

/**
 * GA4 conversion tracking for phone, WhatsApp, email and booking clicks.
 *
 * Consent-first: ConsentGatedGoogleAnalytics only defines window.gtag after the
 * visitor chooses "Accept all cookies", so for anyone who chose essential only
 * (or hasn't answered) every call below is a no-op and nothing is sent.
 *
 * One delegated, capture-phase listener on the document, so links added anywhere
 * later are tracked without touching them, and it still fires when a component
 * stops propagation or opens the link in a new tab.
 *
 * Events (mark phone_click and booking_click as key events in GA4 → Admin → Events):
 *   phone_click     tel: links             { phone_number, link_text, link_location }
 *   whatsapp_click  wa.me / WhatsApp links { link_url, link_text, link_location }
 *   email_click     mailto: links          { email, link_text, link_location }
 *   booking_click   links out to Fresha    { link_url, link_text, link_location }
 *
 * link_location is header, footer, hero, cta_banner, popup or content. Add
 * data-track-location="..." to any element to override it.
 */

const AREAS: Array<[string, string | null]> = [
  ["[data-track-location]", null],
  ["header", "header"], // includes the mobile menu
  ["footer", "footer"],
  ['[role="dialog"]', "popup"], // discount pop-up, cookie banner
];

const BOOKING_HOSTS = /(^|\.)fresha\.com$/i;

function locationOf(el: Element): string {
  for (const [selector, name] of AREAS) {
    const hit = el.closest(selector);
    if (hit) return name ?? (hit as HTMLElement).dataset.trackLocation ?? "content";
  }
  return "content";
}

function send(name: string, params: Record<string, string>) {
  if (typeof window.gtag !== "function") return; // no consent: send nothing
  window.gtag("event", name, { ...params, page_path: window.location.pathname });
}

export function ClickTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const linkText = (link.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 100);
      const where = locationOf(link);

      if (href.startsWith("tel:")) {
        send("phone_click", {
          phone_number: href.slice(4).replace(/\s+/g, ""),
          link_text: linkText,
          link_location: where,
        });
        return;
      }
      if (/wa\.me|whatsapp\.com/i.test(href)) {
        send("whatsapp_click", { link_url: href.split("?")[0], link_text: linkText, link_location: where });
        return;
      }
      if (href.startsWith("mailto:")) {
        send("email_click", { email: href.slice(7).split("?")[0], link_text: linkText, link_location: where });
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (BOOKING_HOSTS.test(url.hostname)) {
        send("booking_click", {
          link_url: url.origin + url.pathname,
          link_text: linkText,
          link_location: where,
        });
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
