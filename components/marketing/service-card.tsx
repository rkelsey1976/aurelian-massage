import Link from "next/link";

import type { Service } from "@/lib/services";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const { name, duration, price, description, featured, slug } = service;

  return (
    <article
      className="relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-gold-glow"
      style={{
        background: featured
          ? "linear-gradient(135deg, rgba(78,61,80,0.6) 0%, rgba(35,23,37,0.9) 100%)"
          : "rgba(44, 30, 66, 0.55)",
        border: featured
          ? "1px solid rgba(197, 165, 86, 0.5)"
          : "1px solid rgba(197, 165, 86, 0.18)",
        boxShadow: featured
          ? "0 8px 32px rgba(32, 21, 46, 0.6), 0 0 0 1px rgba(44, 30, 66, 0.35)"
          : "0 4px 20px rgba(32, 21, 46, 0.4)",
      }}
    >
      {featured && (
        <span
          aria-label="Signature treatment"
          className="absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-royal"
          style={{ background: "#C5A556" }}
        >
          Signature
        </span>
      )}

      {/* Duration & price */}
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-premium/40 px-3 py-1 text-xs font-medium text-gold-premium">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {duration} min
        </span>
        <span className="font-serif text-xl font-semibold text-neutral-light">
          £{price}
        </span>
      </div>

      {/* Name */}
      <h3 className="mt-4 font-serif text-lg font-semibold leading-snug text-neutral-light sm:text-xl">
        {name}
      </h3>

      {/* Description */}
      <p className="mt-3 flex-1 text-sm leading-7 text-neutral-gray">
        {description}
      </p>

      {/* CTA */}
      <div className="mt-6">
        <Link
          href={`/contact?service=${slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-gold-premium/65 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold-premium transition-all duration-300 hover:border-gold-premium hover:bg-gold-premium hover:text-purple-royal focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-premium focus-visible:ring-offset-2 focus-visible:ring-offset-purple-royal"
        >
          Book this treatment
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
