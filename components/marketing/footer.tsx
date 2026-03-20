import Link from "next/link";
import Image from "next/image";
import type { ReactElement } from "react";

import { navigationItems, siteConfig } from "@/lib/site-config";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

const socialIcons: Record<string, (props: { className?: string }) => ReactElement> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-gold-accent/40"
      style={{ background: "#180F24" }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        {/* Brand column */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#180F24]"
            aria-label={`${siteConfig.name} — Home`}
          >
            <Image
              src="/logo.svg"
              alt=""
              width={220}
              height={80}
              className="h-16 w-auto sm:h-[4.5rem]"
            />
            <span className="font-serif text-xl font-semibold text-gold-accent sm:text-2xl">
              {siteConfig.name}
            </span>
          </Link>
          <p className="max-w-md text-sm leading-6 text-neutral-mid">
            {siteConfig.tagline}
          </p>
          <div className="space-y-1 text-sm text-neutral-mid">
            <p>{siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.postalCode}</p>
            <p>
              <a
                href={`tel:${siteConfig.phone}`}
                className="rounded transition-colors duration-200 hover:text-gold-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent"
              >
                {siteConfig.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded transition-colors duration-200 hover:text-gold-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3 pt-1">
            {siteConfig.socialProfiles.map((social) => {
              const Icon = socialIcons[social.platform];
              if (!Icon) return null;
              return (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full border border-gold-accent/25 text-neutral-mid/70 transition-all duration-300 hover:border-gold-accent/60 hover:text-gold-accent hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Navigation column */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-champagne">
            Pages
          </p>
          <ul className="mt-5 space-y-3 text-sm text-neutral-mid">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded transition-colors duration-200 hover:text-gold-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours column */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-champagne">
            Opening Hours
          </p>
          <ul className="mt-5 space-y-3 text-sm text-neutral-mid/70">
            {siteConfig.openingHours.map((hours) => (
              <li key={hours.schema}>{hours.label}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gold-accent/35">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 sm:flex-row">
          <p className="text-center text-xs text-neutral-mid">
            © {year} {siteConfig.name}. All rights reserved.
            {" · "}
            <Link
              href="/privacy"
              className="transition-colors hover:text-gold-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent rounded"
            >
              Privacy &amp; cookies
            </Link>
          </p>
          <p className="text-center text-xs text-neutral-mid/90">
            Website designed &amp; built by{" "}
            <a
              href="https://seo-kings.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-light/90 underline decoration-neutral-mid/50 underline-offset-2 transition-colors hover:text-gold-accent hover:decoration-gold-accent/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent rounded"
            >
              SEO Kings
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
