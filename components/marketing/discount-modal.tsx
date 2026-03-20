"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Copy, Check, Sparkles } from "lucide-react";

const STORAGE_KEY = "aurelian_offer_seen";
const DISCOUNT_CODE = "WELCOME10";
const DELAY_MS = 3500;

export function DiscountModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      // Move focus into the modal after animation
      setTimeout(() => firstFocusRef.current?.focus(), 120);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  const dismiss = useCallback((claimed: boolean) => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, claimed ? "claimed" : "dismissed");
  }, []);

  // Close on ESC
  useEffect(() => {
    if (!isVisible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isVisible, dismiss]);

  // Focus trap
  useEffect(() => {
    if (!isVisible) return;
    const modal = overlayRef.current?.querySelector("[role='dialog']");
    if (!modal) return;
    const focusable = modal.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    modal.addEventListener("keydown", trap as EventListener);
    return () => modal.removeEventListener("keydown", trap as EventListener);
  }, [isVisible]);

  async function handleCopy() {
    await navigator.clipboard.writeText(DISCOUNT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(20,12,32,0.80)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === overlayRef.current) dismiss(false);
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="offer-title"
            aria-describedby="offer-desc"
            className="relative w-full max-w-md overflow-hidden rounded-3xl"
            style={{
              background: "linear-gradient(160deg, #2C1E42 0%, #3B2660 55%, #20152E 100%)",
              border: "1px solid rgba(197,165,86,0.30)",
              boxShadow:
                "0 0 60px rgba(122,80,176,0.25), 0 24px 64px rgba(20,12,32,0.7)",
            }}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Gold shimmer top bar */}
            <div
              aria-hidden="true"
              className="h-1 w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #C5A556, #DFC98A, #C5A556, transparent)",
              }}
            />

            {/* Close button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => dismiss(false)}
              aria-label="Close offer"
              className="absolute right-4 top-4 flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full text-neutral-mid/70 transition-all duration-200 hover:bg-white/10 hover:text-neutral-light focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
            >
              <X size={16} aria-hidden="true" />
            </button>

            <div className="px-8 pb-9 pt-8">
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <Sparkles
                  size={14}
                  aria-hidden="true"
                  className="text-gold-accent"
                  strokeWidth={1.5}
                />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
                  Exclusive welcome offer
                </span>
              </div>

              {/* Headline */}
              <h2
                id="offer-title"
                className="mt-4 font-serif text-3xl font-semibold leading-tight text-gold-champagne sm:text-4xl"
              >
                10% off your first treatment
              </h2>

              {/* Body */}
              <p id="offer-desc" className="mt-4 text-sm leading-7 text-neutral-mid">
                Book any massage treatment at Aurelian Massage and save 10% when
                you use this code at checkout. One use per customer.
              </p>

              {/* Code block */}
              <div
                className="mt-7 flex items-center justify-between gap-3 rounded-2xl px-5 py-4"
                style={{
                  background: "rgba(197,165,86,0.08)",
                  border: "1px solid rgba(197,165,86,0.30)",
                }}
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-mid/50">
                    Your discount code
                  </p>
                  <p className="mt-1 font-serif text-2xl font-semibold tracking-wider text-gold-champagne">
                    {DISCOUNT_CODE}
                  </p>
                </div>
                <button
                  ref={firstFocusRef}
                  type="button"
                  onClick={handleCopy}
                  aria-label={copied ? "Code copied" : "Copy discount code"}
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-gold transition-all duration-200 hover:scale-105 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
                  style={{ background: "#C5A556" }}
                >
                  {copied ? (
                    <>
                      <Check size={13} aria-hidden="true" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={13} aria-hidden="true" />
                      Copy code
                    </>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div
                aria-hidden="true"
                className="my-6 h-px w-full"
                style={{ background: "rgba(122,80,176,0.25)" }}
              />

              {/* CTAs */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/treatments"
                  onClick={() => dismiss(true)}
                  className="flex flex-1 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-on-gold transition-all duration-300 hover:scale-105 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
                  style={{
                    background: "#C5A556",
                    boxShadow: "0 0 20px rgba(197,165,86,0.30)",
                  }}
                >
                  Browse treatments
                </Link>
                <button
                  type="button"
                  onClick={() => dismiss(false)}
                  className="flex-1 rounded-full border border-gold-accent/40 px-6 py-3 text-sm font-medium text-neutral-mid transition-all duration-200 hover:border-gold-accent/70 hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
                >
                  Maybe later
                </button>
              </div>

              {/* Fine print */}
              <p className="mt-5 text-center text-[11px] leading-5 text-neutral-mid/60">
                One use per customer. Cannot be combined with other offers.
                <br />
                Present code at time of booking.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
