"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type HeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  description: string;
  primaryCta: {
    href: string;
    label: string;
    target?: string;
    rel?: string;
  };
  secondaryCta: {
    href: string;
    label: string;
    target?: string;
    rel?: string;
  };
};

export function Hero({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const bgY = useTransform(
    scrollY,
    [0, 600],
    prefersReducedMotion ? [0, 0] : [0, 140],
  );

  const fadeUp = (y = 20) => ({
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" as const },
    },
  });

  return (
    <section className="relative overflow-hidden">
      {/* Background image — parallax layer */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-20%] bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/therapist-hero.png')", backgroundPosition: "center 30%", y: bgY }}
      />
      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(32,21,46,0.88) 0%, rgba(32,21,46,0.70) 55%, rgba(122,80,176,0.55) 100%)",
        }}
      />
      {/* Grain */}
      <div aria-hidden="true" className="noise absolute inset-0" />
      {/* Vignette */}
      <div aria-hidden="true" className="vignette absolute inset-0" />

      <motion.div
        className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1fr_auto] lg:items-center lg:py-32"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15 },
          },
        }}
      >
        {/* Left — headline content */}
        <div className="space-y-7">
          <motion.p
            className="text-sm font-medium tracking-[0.3em] uppercase text-gold-accent"
            variants={fadeUp()}
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            className="max-w-3xl font-serif text-5xl font-semibold leading-tight tracking-tight text-neutral-light sm:text-6xl lg:text-7xl"
            variants={fadeUp(30)}
          >
            {title}
          </motion.h1>

          {subtitle ? (
            <motion.p
              className="font-serif text-2xl font-light italic text-neutral-light/80 sm:text-3xl"
              variants={fadeUp()}
            >
              {subtitle}
            </motion.p>
          ) : null}

          <motion.p
            className="max-w-2xl text-lg leading-8 text-neutral-mid"
            variants={fadeUp()}
          >
            {description}
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 pt-2" variants={fadeUp()}>
            <Link
              href={primaryCta.href}
              target={primaryCta.target}
              rel={primaryCta.rel}
              className="rounded-full px-8 py-3.5 text-sm font-semibold text-on-gold transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
              style={{
                background: "#C5A556",
                boxShadow:
                  "0 0 20px rgba(197, 165, 86, 0.3), 0 4px 16px rgba(32, 21, 46, 0.5)",
              }}
            >
              {primaryCta.label}
            </Link>
            {/* border-gold-accent/65 gives ~3.4:1 contrast against the dark hero bg, meeting WCAG 1.4.11 */}
            <Link
              href={secondaryCta.href}
              target={secondaryCta.target}
              rel={secondaryCta.rel}
              className="rounded-full border border-gold-accent/65 px-8 py-3.5 text-sm font-medium text-neutral-mid transition-all duration-300 hover:border-gold-accent hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
            >
              {secondaryCta.label}
            </Link>
          </motion.div>
        </div>

        {/* Right — logo */}
        <motion.div
          className="hidden lg:flex lg:items-center lg:justify-center"
          variants={{
            hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.85 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: prefersReducedMotion ? 0 : 0.9,
                ease: "easeOut",
              },
            },
          }}
        >
          <Image
            src="/logo.svg"
            alt="Aurelian Massage logo"
            width={340}
            height={340}
            className="h-auto w-full max-w-[340px] drop-shadow-[0_0_40px_rgba(197,165,86,0.35)]"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-20"
        style={{
          background: "linear-gradient(to bottom, transparent, #20152E)",
        }}
      />
    </section>
  );
}
