import Link from "next/link";

import { megaMenuFeatured, navServiceGroups } from "@/lib/nav-services";

type MegaMenuProps = {
  onClose: () => void;
};

export function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <div
      id="mega-menu"
      role="region"
      aria-label="Treatments menu"
      className="absolute left-0 right-0 top-full z-50 border-b border-gold-accent/20"
      style={{
        background: "rgba(32, 21, 46, 0.98)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 20px 60px rgba(32, 21, 46, 0.8)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr_1fr_280px]">

          {/* Service groups */}
          {navServiceGroups.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-accent">
                {group.title}
              </p>
              <ul className="mt-4 space-y-1">
                {group.services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      onClick={onClose}
                      className="group flex items-start justify-between rounded-xl p-2.5 transition-all duration-200 hover:bg-white/5 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent"
                    >
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-neutral-light transition-colors duration-200 group-hover:text-gold-accent">
                          {service.label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-5 text-neutral-mid/60">
                          {service.description}
                        </span>
                      </span>
                      <span className="ml-3 mt-0.5 shrink-0 text-right">
                        <span className="block text-xs font-semibold text-gold-accent">
                          £{service.price}
                        </span>
                        <span className="block text-[10px] text-neutral-mid/50">
                          {service.duration} min
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Featured CTA card */}
          <div
            className="flex flex-col justify-between rounded-2xl p-6"
            style={{
              background: "linear-gradient(135deg, rgba(44,30,66,1) 0%, rgba(59,38,96,1) 100%)",
              border: "1px solid rgba(197, 165, 86, 0.3)",
              boxShadow: "0 0 20px rgba(197, 165, 86, 0.08)",
            }}
          >
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-accent">
                {megaMenuFeatured.eyebrow}
              </p>
              <p className="font-serif text-lg font-semibold leading-snug text-neutral-light">
                {megaMenuFeatured.title}
              </p>
              <p className="text-sm leading-6 text-neutral-mid/80">
                {megaMenuFeatured.description}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={megaMenuFeatured.cta.href}
                onClick={onClose}
                className="rounded-full px-5 py-2.5 text-center text-sm font-semibold text-on-gold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
                style={{ background: "#C5A556" }}
              >
                {megaMenuFeatured.cta.label}
              </Link>
              <Link
                href={megaMenuFeatured.secondaryCta.href}
                onClick={onClose}
                className="rounded-full border border-gold-accent/65 px-5 py-2.5 text-center text-sm font-medium text-neutral-mid transition-all duration-200 hover:border-gold-accent hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
              >
                {megaMenuFeatured.secondaryCta.label}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
