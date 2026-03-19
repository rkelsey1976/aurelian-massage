import Link from "next/link";

import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Privacy & cookies",
  description:
    "How Aurelian Massage uses cookies and handles your data when you use our website and booking links.",
  path: "/privacy",
  keywords: ["privacy policy", "cookies", "Aurelian Massage", "Bath"],
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-neutral-mid/50">
          <li>
            <Link
              href="/"
              className="rounded transition-colors hover:text-gold-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-neutral-mid/30">
            ›
          </li>
          <li className="text-neutral-mid/80">Privacy &amp; cookies</li>
        </ol>
      </nav>

      <h1 className="font-serif text-4xl font-semibold text-neutral-light sm:text-5xl">
        Privacy &amp; cookies
      </h1>
      <p className="mt-4 text-sm text-neutral-mid/70">Last updated: March 2026</p>

      <div className="mt-10 space-y-8 text-neutral-mid">
        <section>
          <h2 className="font-serif text-xl font-semibold text-neutral-light">Who we are</h2>
          <p className="mt-3 text-base leading-8">
            This website is operated by <strong className="text-neutral-light">{siteConfig.legalName}</strong>{" "}
            ({siteConfig.email}). Our studio address is {siteConfig.address.street}, {siteConfig.address.city},{" "}
            {siteConfig.address.postalCode}.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-neutral-light">Cookies</h2>
          <p className="mt-3 text-base leading-8">
            Cookies are small files stored on your device when you visit a website. We use{" "}
            <strong className="text-neutral-light">essential cookies</strong> where needed for the site to
            function — for example, to remember your cookie choices.
          </p>
          <p className="mt-4 text-base leading-8">
            If you choose <strong className="text-neutral-light">Accept all cookies</strong>, we load{" "}
            <strong className="text-neutral-light">Google Analytics</strong> (Google LLC) using cookies and
            similar technologies to collect aggregated information about how visitors use this website (for
            example pages viewed and general location at country/city level). Google&apos;s privacy policy
            applies to how Google processes that data:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gold-accent underline decoration-gold-accent/40 underline-offset-2 hover:decoration-gold-accent"
            >
              policies.google.com/privacy
            </a>
            . We do not load Google Analytics if you choose essential cookies only.
          </p>
          <p className="mt-4 text-base leading-8">
            You can change your mind by clearing site data for this domain in your browser and revisiting
            the site; the cookie banner will appear again.
          </p>
          <p className="mt-4 text-base leading-8">
            Online booking is provided by a third party (Fresha). Their site may set its own cookies when
            you follow our booking links — please refer to Fresha&apos;s privacy and cookie policies when
            using their service.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-neutral-light">Contact form</h2>
          <p className="mt-3 text-base leading-8">
            If you use our contact form, we process the information you send only to respond to your enquiry.
            We do not sell your personal data.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-neutral-light">Your rights</h2>
          <p className="mt-3 text-base leading-8">
            Under UK GDPR you may have rights to access, correct, or delete personal data we hold about you,
            and to object to or restrict certain processing. To exercise these rights, contact us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-gold-accent underline decoration-gold-accent/40 underline-offset-2 hover:decoration-gold-accent"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>

        <p className="pt-4 text-sm text-neutral-mid/60">
          <Link href="/contact" className="text-gold-accent hover:underline">
            Contact us
          </Link>
          {" · "}
          <Link href="/" className="text-gold-accent hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
