"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, ChevronDown, Menu, Phone, X } from "lucide-react";

import { MegaMenu } from "@/components/marketing/mega-menu";
import { navServiceGroups } from "@/lib/nav-services";
import { navigationItems, siteConfig } from "@/lib/site-config";

export function Header() {
  // Desktop mega-menu
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);

  // Escape key closes whichever is open
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (mobileOpen) {
          setMobileOpen(false);
        } else if (megaOpen) {
          setMegaOpen(false);
          megaTriggerRef.current?.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [megaOpen, mobileOpen]);

  // Close mega-menu on click outside (desktop only)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setMegaOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function closeMega() {
    setMegaOpen(false);
  }

  function closeMobile() {
    setMobileOpen(false);
    setMobileTreatmentsOpen(false);
  }

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-40 border-b border-gold-accent/20 backdrop-blur"
        style={{ background: "rgba(32, 21, 46, 0.93)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
          {/* Logo / brand — smaller on mobile, name hidden on smallest screens */}
          <Link
            href="/"
            onClick={closeMobile}
            className="flex min-w-0 flex-shrink-0 items-center gap-2 sm:gap-3 transition-opacity duration-300 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
            aria-label={`${siteConfig.name} — Home`}
          >
            <Image
              src="/logo.svg"
              alt=""
              width={200}
              height={72}
              className="h-9 w-auto sm:h-14 md:h-16 lg:h-[4.5rem]"
              priority
            />
            <span className="font-serif text-base font-semibold tracking-tight text-gold-accent sm:text-lg md:text-xl">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop nav — hidden below lg */}
          <nav aria-label="Primary navigation" className="hidden lg:block">
            <ul className="flex flex-wrap items-center gap-6 text-sm font-medium text-neutral-mid">
              {navigationItems.map((item) =>
                item.label === "Treatments" ? (
                  <li key={item.href}>
                    <button
                      ref={megaTriggerRef}
                      type="button"
                      aria-expanded={megaOpen}
                      aria-haspopup="true"
                      aria-controls="mega-menu"
                      onClick={() => setMegaOpen((prev) => !prev)}
                      className="flex items-center gap-1.5 rounded transition-all duration-200 hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-1 focus-visible:ring-offset-purple-dark"
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMega}
                      className="rounded transition-all duration-200 hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-1 focus-visible:ring-offset-purple-dark"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* Desktop phone + book CTA — hidden below lg */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-mid transition-colors duration-200 hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent rounded"
              aria-label={`Call us on ${siteConfig.phone}`}
            >
              <Phone size={14} aria-hidden="true" className="text-gold-accent" />
              {siteConfig.phone}
            </a>
            <Link
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-on-gold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
              style={{ background: "#C5A556" }}
            >
              <CalendarCheck size={14} aria-hidden="true" />
              Book now
            </Link>
          </div>

          {/* Hamburger — visible below lg */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-lg text-neutral-mid transition-colors duration-200 hover:bg-white/10 hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
          >
            {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>

        {/* Desktop mega-menu */}
        {megaOpen && <MegaMenu onClose={closeMega} />}
      </header>

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              aria-hidden="true"
              onClick={closeMobile}
            />

            {/* Drawer panel — use div with role=dialog so nav landmark is not mixed with dialog role */}
            <motion.div
              key="mobile-nav"
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed right-0 top-0 z-50 flex h-full w-full flex-col overflow-y-auto lg:hidden"
              style={{
                background: "rgba(28, 18, 40, 0.98)",
                backdropFilter: "blur(16px)",
                borderLeft: "1px solid rgba(197,165,86,0.15)",
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4"
                style={{ borderBottom: "1px solid rgba(197,165,86,0.12)" }}
              >
                <Link
                  href="/"
                  onClick={closeMobile}
                  className="flex min-w-0 flex-shrink-0 items-center gap-2 transition-opacity duration-300 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
                  aria-label={`${siteConfig.name} — Home`}
                >
                  <Image
                    src="/logo.svg"
                    alt=""
                    width={120}
                    height={44}
                    className="h-10 w-auto sm:h-11"
                  />
                  <span className="font-serif text-sm font-semibold text-gold-accent sm:text-base">
                    {siteConfig.name}
                  </span>
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={closeMobile}
                  className="flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-lg text-neutral-mid transition-colors hover:bg-white/10 hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Nav links */}
              <nav aria-label="Main links" className="flex-1 px-4 py-6">
              <ul className="space-y-1">
                {navigationItems.map((item) =>
                  item.label === "Treatments" ? (
                    <li key={item.href}>
                      {/* Treatments accordion trigger */}
                      <button
                        type="button"
                        aria-expanded={mobileTreatmentsOpen}
                        onClick={() => setMobileTreatmentsOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-neutral-mid transition-all duration-200 hover:bg-white/8 hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          aria-hidden="true"
                          className={`transition-transform duration-200 ${mobileTreatmentsOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {/* Treatments sub-list */}
                      <AnimatePresence initial={false}>
                        {mobileTreatmentsOpen && (
                          <motion.div
                            key="treatments-panel"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div
                              className="mx-2 mt-1 mb-2 rounded-xl px-3 py-3 space-y-4"
                              style={{
                                background: "rgba(44,30,66,0.6)",
                                border: "1px solid rgba(122,80,176,0.20)",
                              }}
                            >
                              {navServiceGroups.map((group) => (
                                <div key={group.title}>
                                  <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-champagne">
                                    {group.title}
                                  </p>
                                  <ul className="space-y-0.5">
                                    {group.services.map((svc) => (
                                      <li key={svc.href}>
                                        <Link
                                          href={svc.href}
                                          onClick={closeMobile}
                                          className="flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/8 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent"
                                        >
                                          <span className="text-sm font-medium text-neutral-light">
                                            {svc.label}
                                          </span>
                                          <span className="ml-2 shrink-0 text-xs font-semibold text-gold-accent">
                                            £{svc.price}
                                          </span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}

                              <Link
                                href="/treatments"
                                onClick={closeMobile}
                                className="mt-1 flex w-full items-center justify-center rounded-lg border border-gold-accent/30 py-2 text-xs font-medium text-gold-accent transition-all duration-200 hover:border-gold-accent hover:bg-gold-accent/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent"
                              >
                                View all treatments →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMobile}
                        className="block rounded-xl px-4 py-3 text-base font-medium text-neutral-mid transition-all duration-200 hover:bg-white/8 hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
              </nav>

              {/* Drawer footer — Book CTA */}
              <div
                className="px-6 py-6"
                style={{ borderTop: "1px solid rgba(197,165,86,0.12)" }}
              >
                <Link
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-on-gold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
                  style={{
                    background: "#C5A556",
                    boxShadow: "0 0 20px rgba(197,165,86,0.25)",
                  }}
                >
                  <CalendarCheck size={16} aria-hidden="true" />
                  Book a treatment
                </Link>
                <p className="mt-3 text-center text-[11px] text-neutral-mid/50">
                  {siteConfig.openingHours[0].label}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
