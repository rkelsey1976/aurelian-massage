"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

import type { Service } from "@/lib/services";

type ServiceCarouselProps = {
  services: Service[];
};

function ServiceCarouselCard({ service }: { service: Service }) {
  const { name, duration, price, description, featured, slug, gradient, image } =
    service;

  return (
    <article
      className="group relative flex w-[300px] flex-shrink-0 flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] sm:w-[340px] h-full"
      style={{
        border: featured
          ? "1px solid rgba(122,80,176,0.55)"
          : "1px solid rgba(122,80,176,0.20)",
        boxShadow: featured
          ? "0 8px 32px rgba(32,21,46,0.7), 0 0 0 1px rgba(122,80,176,0.35)"
          : "0 4px 20px rgba(32,21,46,0.5)",
        background: "#2C1E42",
      }}
    >
      {/* Image area */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image ?? "/hero-massage.png"}
          alt={`${name} massage treatment in Bath, Somerset`}
          fill
          sizes="340px"
          className="object-cover object-center grayscale brightness-90 transition-[filter] duration-700 group-hover:grayscale-0 group-hover:brightness-100"
        />
        {/* Per-service gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: gradient }}
        />
        {/* Duration pill — sits over the image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-neutral-light backdrop-blur-sm">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
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
        </div>
        {/* Featured badge */}
        {featured && (
          <span
            className="absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-light"
            style={{ background: "#7A50B0" }}
          >
            Signature
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Price */}
        <p className="font-serif text-2xl font-semibold text-gold-accent">
          £{price}
        </p>

        {/* Name */}
        <h3 className="mt-2 font-serif text-base font-semibold leading-snug text-neutral-light sm:text-lg">
          {name}
        </h3>

        {/* Description — clamped to 3 lines */}
        <p className="mt-3 flex-1 text-sm leading-6 text-neutral-mid line-clamp-3">
          {description}
        </p>

        {/* CTA */}
        <div className="mt-5">
          <Link
            href={`/services/${slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-gold-accent/65 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold-accent transition-all duration-300 hover:border-gold-accent hover:bg-gold-accent hover:text-purple-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
          >
            View treatment
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
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
      </div>
    </article>
  );
}

export function ServiceCarousel({ services }: ServiceCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const cardWidth = 340 + 24; // card width + gap

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const wrapped = ((index % services.length) + services.length) % services.length;
    track.scrollTo({ left: wrapped * cardWidth, behavior: prefersReducedMotion ? "auto" : "smooth" });
    setActiveIndex(wrapped);
  }, [services.length, cardWidth, prefersReducedMotion]);

  const prev = () => scrollTo(activeIndex - 1);
  const next = () => scrollTo(activeIndex + 1);

  // Sync dot indicator to scroll position
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const index = Math.round(track.scrollLeft / cardWidth);
      setActiveIndex(index);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [cardWidth]);

  return (
    <div className="relative">
      {/* Track */}
      <motion.div
        ref={trackRef}
        className="flex items-stretch gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left padding sentinel */}
        <div aria-hidden="true" className="w-0 flex-shrink-0 lg:w-2" />

        {services.map((service) => (
          <div
            key={service.slug}
            style={{ scrollSnapAlign: "start" }}
            className="flex flex-shrink-0"
          >
            <ServiceCarouselCard service={service} />
          </div>
        ))}

        {/* Right padding sentinel */}
        <div aria-hidden="true" className="w-0 flex-shrink-0 lg:w-2" />
      </motion.div>

      {/* Controls row */}
      <div className="mt-6 flex items-center justify-between">
        {/* Dot indicators */}
        <div className="flex gap-2" role="tablist" aria-label="Service slides">
          {services.map((s, i) => (
            <button
              key={s.slug}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to ${s.name}`}
              onClick={() => scrollTo(i)}
              className="h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
              style={{
                width: i === activeIndex ? "24px" : "8px",
                background:
                  i === activeIndex
                    ? "#C5A556"
                    : "rgba(197, 165, 86, 0.3)",
              }}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div className="flex gap-3">
          <button
            onClick={prev}
            aria-label="Previous treatment"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-accent/40 text-gold-accent transition-all duration-200 hover:border-gold-accent hover:bg-gold-accent hover:text-purple-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next treatment"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-accent/40 text-gold-accent transition-all duration-200 hover:border-gold-accent hover:bg-gold-accent hover:text-purple-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
