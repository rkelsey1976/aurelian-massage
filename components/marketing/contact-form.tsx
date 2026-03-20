"use client";

import { useState } from "react";
import { Send, CalendarCheck, CheckCircle } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="flex flex-col items-start gap-5 rounded-2xl p-8"
        style={{ background: "#2C1E42", border: "1px solid rgba(197,165,86,0.25)" }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(197,165,86,0.12)" }}>
          <CheckCircle size={24} className="text-gold-accent" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-semibold text-neutral-light">
            Message sent — thank you!
          </h3>
          <p className="mt-2 text-base leading-7 text-neutral-mid">
            We will get back to you within one business day. In the meantime,
            you can book your treatment directly via Fresha.
          </p>
        </div>
        <Link
          href={siteConfig.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-on-gold transition-all duration-300 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
          style={{ background: "#C5A556" }}
        >
          <CalendarCheck size={14} aria-hidden="true" />
          Book online via Fresha
        </Link>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Required hidden field for Netlify */}
      <input type="hidden" name="form-name" value="contact" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="first-name"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-mid/70"
          >
            First name <span className="text-gold-accent" aria-hidden="true">*</span>
          </label>
          <input
            id="first-name"
            name="first-name"
            type="text"
            required
            autoComplete="given-name"
            className="w-full rounded-xl px-4 py-3 text-sm text-neutral-light placeholder-neutral-mid/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 focus:ring-offset-purple-royal"
            style={{ background: "#2C1E42", border: "1px solid rgba(122,80,176,0.30)" }}
            placeholder="Jane"
          />
        </div>
        <div>
          <label
            htmlFor="last-name"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-mid/70"
          >
            Last name <span className="text-gold-accent" aria-hidden="true">*</span>
          </label>
          <input
            id="last-name"
            name="last-name"
            type="text"
            required
            autoComplete="family-name"
            className="w-full rounded-xl px-4 py-3 text-sm text-neutral-light placeholder-neutral-mid/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 focus:ring-offset-purple-royal"
            style={{ background: "#2C1E42", border: "1px solid rgba(122,80,176,0.30)" }}
            placeholder="Smith"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-mid/70"
        >
          Email address <span className="text-gold-accent" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-xl px-4 py-3 text-sm text-neutral-light placeholder-neutral-mid/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 focus:ring-offset-purple-royal"
          style={{ background: "#2C1E42", border: "1px solid rgba(122,80,176,0.30)" }}
          placeholder="jane@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-mid/70"
        >
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="w-full rounded-xl px-4 py-3 text-sm text-neutral-light placeholder-neutral-mid/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 focus:ring-offset-purple-royal"
          style={{ background: "#2C1E42", border: "1px solid rgba(122,80,176,0.30)" }}
          placeholder="07700 000000"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-mid/70"
        >
          Your message <span className="text-gold-accent" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full resize-none rounded-xl px-4 py-3 text-sm text-neutral-light placeholder-neutral-mid/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 focus:ring-offset-purple-royal"
          style={{ background: "#2C1E42", border: "1px solid rgba(122,80,176,0.30)" }}
          placeholder="Tell us what you'd like to know — questions about treatments, health considerations, or anything else…"
        />
      </div>

      {error && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again or email us directly at{" "}
          <a href={`mailto:${siteConfig.email}`} className="underline hover:text-gold-accent">
            {siteConfig.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-on-gold transition-all duration-300 hover:scale-[1.02] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-royal disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{
          background: "#C5A556",
          boxShadow: "0 0 24px rgba(197,165,86,0.30), 0 4px 16px rgba(32,21,46,0.4)",
        }}
      >
        <Send size={16} aria-hidden="true" />
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
