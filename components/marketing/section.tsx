import Link from "next/link";
import type { ReactNode } from "react";

type SectionCta = {
  href: string;
  label: string;
};

type SectionProps = {
  as?: "h1" | "h2";
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: SectionCta;
  children: ReactNode;
};

export function Section({
  as: HeadingTag = "h2",
  eyebrow,
  title,
  description,
  cta,
  children,
}: SectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-end justify-between gap-6">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-premium">
              {eyebrow}
            </p>
          ) : null}
          <HeadingTag className="mt-3 font-serif text-3xl font-semibold tracking-tight text-gold-champagne">
            {title}
          </HeadingTag>
          {description ? (
            <p className="mt-4 text-lg leading-8 text-neutral-gray">
              {description}
            </p>
          ) : null}
        </div>

        {cta ? (
          <Link
            href={cta.href}
            className="hidden shrink-0 items-center gap-1.5 rounded-full border border-gold-accent/35 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-mid transition-all duration-200 hover:border-gold-accent hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent sm:inline-flex"
          >
            {cta.label}
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        ) : null}
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}
