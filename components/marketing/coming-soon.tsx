import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

export function ComingSoonHome() {
  const { comingSoonCopy, bookingUrl, email, socialProfiles, address } = siteConfig;
  const mailHref = `mailto:${email}?subject=${encodeURIComponent("Aurelian Massage — enquiry")}`;

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-royal via-purple-deep to-[#2a1f3d]"
      />
      <div aria-hidden className="noise pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 60% at 50% -10%, rgba(197,165,86,0.16) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-12rem)] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center sm:min-h-[calc(100vh-10rem)] sm:py-24">
        <Image
          src="/logo.svg"
          alt=""
          width={240}
          height={240}
          priority
          className="h-32 w-32 opacity-[0.97] drop-shadow-[0_8px_40px_rgba(197,165,86,0.35)] sm:h-40 sm:w-40"
        />

        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.35em] text-gold-premium sm:text-xs">
          {comingSoonCopy.eyebrow}
        </p>

        <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-neutral-light sm:text-4xl md:text-[2.75rem]">
          {comingSoonCopy.headline}
        </h1>

        <p className="mt-3 font-serif text-lg font-light text-gold-champagne sm:text-xl">{comingSoonCopy.subheadline}</p>

        <div className="mx-auto mt-8 max-w-xl">
          <p className="text-sm leading-7 text-neutral-gray sm:text-base sm:leading-8">{comingSoonCopy.body}</p>
        </div>

        <p className="mt-8 text-xs text-neutral-gray/90">
          {address.street}, {address.city} · {address.postalCode}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-md bg-gold-premium px-8 py-3 text-sm font-semibold text-on-gold shadow-luxury-glow transition hover:bg-gold-champagne hover:text-on-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-purple-royal"
          >
            {comingSoonCopy.primaryCtaLabel}
          </a>
          <a
            href={mailHref}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-gold-premium/40 bg-purple-deep/50 px-6 py-3 text-sm font-medium text-gold-champagne transition hover:border-gold-premium/60 hover:bg-purple-deep/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-premium focus-visible:ring-offset-2 focus-visible:ring-offset-purple-royal"
          >
            <Mail size={18} strokeWidth={1.5} aria-hidden />
            {comingSoonCopy.secondaryCtaLabel}
          </a>
        </div>

        {socialProfiles.length > 0 ? (
          <nav aria-label="Social profiles" className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {socialProfiles.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium uppercase tracking-wider text-gold-premium/85 transition hover:text-gold-champagne"
              >
                {s.platform}
              </a>
            ))}
          </nav>
        ) : null}

        <p className="mt-14 text-[11px] text-neutral-gray/70">
          Full site returning soon —{" "}
          <Link href="/contact" className="text-gold-premium/90 underline-offset-2 hover:underline">
            contact
          </Link>{" "}
          for enquiries.
        </p>
      </div>
    </div>
  );
}
