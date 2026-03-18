import { MapPin, Sparkles, UserCheck } from "lucide-react";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { Hero } from "@/components/marketing/hero";
import { ParallaxPhotoGrid } from "@/components/marketing/parallax-photo-grid";
import { ServiceCarousel } from "@/components/marketing/service-carousel";
import { Testimonials } from "@/components/marketing/testimonials";
import { Section } from "@/components/marketing/section";
import { homepageFaqs, buildFaqSchema } from "@/lib/faqs";
import { createPageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { testimonials } from "@/lib/testimonials";

export const metadata = createPageMetadata({
  title: "Luxury Holistic & Deep Tissue Massage in Bath",
  description:
    "Step into a space of total restoration at Aurelian Massage. Specialist remedial and deep tissue massage therapy in Bath city centre, uniquely adapted to your body's needs.",
  path: "/",
  keywords: [
    "luxury massage Bath",
    "holistic massage Bath",
    "deep tissue massage Bath",
    "remedial massage Somerset",
    "Aurelian Massage",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Aurelian Massage • Bath City Centre"
        title="Luxury Holistic & Deep Tissue Massage in Bath"
        description={`Step into a space of total restoration at Aurelian Massage. Inspired by the Latin "Aureus," meaning golden, we bring a premium touch to every session in Bath city centre. Our specialist therapists focus on remedial techniques and stress relief, ensuring every treatment is uniquely adapted to your body's needs. Discover why we are the golden choice for professional massage therapy in Somerset.`}
        primaryCta={{ href: "/services", label: "Explore treatments" }}
        secondaryCta={{ href: "/contact", label: "See contact page" }}
      />

      {/* Introduction */}
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* Two-column: text left, photos right */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — text & pillars */}
          <div>
            {/* Strapline */}
            <p className="font-serif text-xl font-light italic leading-relaxed text-gold-accent sm:text-2xl">
              A modern sanctuary inspired by the timeless healing traditions of the City of Bath.
            </p>
            <div className="mt-6 h-px w-24 bg-gold-accent/40" />

            <p className="mt-8 text-lg leading-8 text-neutral-mid">
              At Aurelian Massage we believe that true restoration goes beyond the physical. Every session
              is shaped around you — your body, your tension, your pace — delivered by specialist therapists
              who combine clinical knowledge with a deeply intuitive touch.
            </p>

            <div className="mt-8 space-y-8">
              {[
                {
                  icon: <UserCheck size={28} strokeWidth={1.5} aria-hidden="true" />,
                  label: "Specialist Therapists",
                  body: "Our therapists are trained in a range of remedial and holistic techniques, ensuring each treatment is both effective and deeply relaxing.",
                },
                {
                  icon: <Sparkles size={28} strokeWidth={1.5} aria-hidden="true" />,
                  label: "Individually Tailored",
                  body: "No two sessions are the same. We take time to understand your needs and adapt every treatment to your body on the day.",
                },
                {
                  icon: <MapPin size={28} strokeWidth={1.5} aria-hidden="true" />,
                  label: "Bath City Centre",
                  body: "Conveniently located in the heart of Bath, our studio is an easy retreat from the pace of daily life — whether you live here or are visiting.",
                },
              ].map((pillar, i) => (
                <div key={pillar.label} className="flex gap-5">
                  <div
                    className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      i === 0
                        ? "text-gold-accent"
                        : i === 1
                          ? "text-purple-mid"
                          : "text-purple-plum"
                    }`}
                    style={
                      i === 0
                        ? { background: "rgba(197,165,86,0.10)", border: "1px solid rgba(197,165,86,0.22)" }
                        : i === 1
                          ? { background: "rgba(122,80,176,0.14)", border: "1px solid rgba(122,80,176,0.30)" }
                          : { background: "rgba(92,61,136,0.14)", border: "1px solid rgba(92,61,136,0.30)" }
                    }
                  >
                    {pillar.icon}
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-semibold text-neutral-light">
                      {pillar.label}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-neutral-mid">{pillar.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — parallax photo grid */}
          <ParallaxPhotoGrid
            photos={[
              { src: "/back-massage.png", alt: "Deep tissue back massage treatment at Aurelian Massage, Bath city centre" },
              { src: "/hot-stones.png", alt: "Hot stone therapy treatment at Aurelian Massage in Bath, Somerset" },
              { src: "/aromatherapy-oil.png", alt: "Aromatherapy oil massage at Aurelian Massage, Bath city centre" },
              { src: "/spa-setup.png", alt: "Luxury treatment room at Aurelian Massage, Bath city centre" },
            ]}
          />
        </div>
      </div>

      <Section
        eyebrow="Our treatments"
        title="Massage Therapy in Bath"
        description="Every treatment at Aurelian Massage is individually tailored to your body's needs. Choose the session that is right for you."
        cta={{ href: "/services", label: "View all treatments" }}
      >
        <ServiceCarousel services={services} />
      </Section>

      <Section
        eyebrow="What our clients say"
        title="Trusted by Guests in Bath & Beyond"
        description="Real experiences from people who've visited Aurelian Massage. We're proud of every session we deliver."
      >
        <Testimonials items={testimonials} />
      </Section>

      <CtaBanner />

      <Section
        eyebrow="Common questions"
        title="Frequently Asked Questions"
        description="Everything you need to know before your visit to Aurelian Massage in Bath."
      >
        <FaqAccordion items={homepageFaqs} />
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(homepageFaqs)) }}
      />
    </>
  );
}
