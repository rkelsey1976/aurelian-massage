import Link from "next/link";
import { CalendarCheck } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #20152E 0%, #3B2660 40%, #5C3D88 60%, #20152E 100%)",
        }}
      />
      {/* Gold ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #C5A556, transparent)" }}
      />
      {/* Purple-mid side glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #7A50B0, transparent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #7A50B0, transparent)" }}
      />
      {/* Grain */}
      <div aria-hidden="true" className="noise absolute inset-0" />

      <div className="relative mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-accent">
          Aurelian Massage · Bath City Centre
        </p>

        <h2 className="mx-auto mt-5 max-w-2xl font-serif text-3xl font-semibold leading-tight text-neutral-light sm:text-4xl lg:text-5xl">
          Ready to experience the golden standard in massage therapy?
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-neutral-mid">
          Book your treatment today and let our specialist therapists create a session
          individually tailored to your body's needs.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-purple-dark transition-all duration-300 hover:scale-105 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
            style={{
              background: "#C5A556",
              boxShadow: "0 0 24px rgba(197,165,86,0.35), 0 4px 16px rgba(32,21,46,0.5)",
            }}
          >
            <CalendarCheck size={16} aria-hidden="true" />
            Book a treatment
          </Link>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-12 h-px w-24 bg-gold-accent/25" />
        <p className="mt-5 text-xs text-neutral-mid/50">
          {siteConfig.openingHours.map((h) => h.label).join(" · ")}
        </p>
      </div>
    </section>
  );
}
