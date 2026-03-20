"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="#1877F2">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          aria-hidden="true"
          className={i < rating ? "fill-gold-accent text-gold-accent" : "fill-neutral-mid/20 text-neutral-mid/20"}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article
      className="relative flex h-full w-[320px] flex-shrink-0 flex-col justify-between rounded-2xl p-7 sm:w-[360px]"
      style={{
        background: "#2C1E42",
        border: "1px solid rgba(122,80,176,0.30)",
        boxShadow: "0 4px 24px rgba(32,21,46,0.55), 0 0 0 1px rgba(122,80,176,0.08)",
      }}
    >
      {/* Grain */}
      <div aria-hidden="true" className="noise-card absolute inset-0 rounded-2xl" />
      {/* Quote icon */}
      <Quote
        size={28}
        aria-hidden="true"
        className="mb-4 text-purple-primary/60"
        strokeWidth={1.5}
      />

      {/* Stars */}
      <StarRating rating={testimonial.rating} />

      {/* Quote text */}
      <blockquote className="mt-4 flex-1 text-sm leading-7 text-neutral-mid">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
        <footer className="mt-6 flex items-center justify-between gap-3 border-t border-purple-mid/20 pt-5">
        <div>
          <p className="text-sm font-semibold text-neutral-light">{testimonial.author}</p>
          {testimonial.location && (
            <p className="mt-0.5 text-xs text-neutral-mid/90">{testimonial.location}</p>
          )}
          {testimonial.treatment && (
            <p className="mt-1 text-xs italic text-gold-champagne">{testimonial.treatment}</p>
          )}
        </div>
        {testimonial.platform === "Google" && (
          <div className="flex flex-col items-center gap-1">
            <GoogleIcon className="h-5 w-5 flex-shrink-0" />
            <span className="text-[10px] text-neutral-mid/80">Google</span>
          </div>
        )}
        {testimonial.platform === "Facebook" && (
          <div className="flex flex-col items-center gap-1">
            <FacebookIcon className="h-5 w-5 flex-shrink-0" />
            <span className="text-[10px] text-neutral-mid/80">Facebook</span>
          </div>
        )}
      </footer>
    </article>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const cardWidth = 376; // 360px card + 16px gap

  const scroll = useCallback(
    (dir: "prev" | "next") => {
      if (!trackRef.current) return;
      const raw = dir === "next" ? activeIndex + 1 : activeIndex - 1;
      const wrapped = ((raw % items.length) + items.length) % items.length;
      trackRef.current.scrollTo({
        left: wrapped * cardWidth,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      setActiveIndex(wrapped);
    },
    [activeIndex, items.length, prefersReducedMotion],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const idx = Math.round(track.scrollLeft / cardWidth);
      setActiveIndex(idx);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      {/* Carousel track */}
      <motion.div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
      >
        {items.map((t) => (
          <div key={t.id} style={{ scrollSnapAlign: "start" }}>
            <TestimonialCard testimonial={t} />
          </div>
        ))}
      </motion.div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between">
        {/* Dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
          {items.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => {
                trackRef.current?.scrollTo({
                  left: i * cardWidth,
                  behavior: prefersReducedMotion ? "auto" : "smooth",
                });
                setActiveIndex(i);
              }}
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
            >
              <span
                aria-hidden="true"
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-gold-accent"
                    : "w-1.5 bg-neutral-mid/40 hover:bg-neutral-mid/60"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Arrow buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("prev")}
            aria-label="Previous testimonial"
            className="flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full border border-gold-accent/25 text-neutral-mid/70 transition-all duration-200 hover:border-gold-accent/60 hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            onClick={() => scroll("next")}
            aria-label="Next testimonial"
            className="flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full border border-gold-accent/25 text-neutral-mid/70 transition-all duration-200 hover:border-gold-accent/60 hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
