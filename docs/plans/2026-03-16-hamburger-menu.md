# Hamburger Menu Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a mobile hamburger button to the header that opens a full-height slide-in drawer with flat nav links and a Services accordion using the existing `navServiceGroups` data.

**Architecture:** The header already holds `isOpen` state for the desktop mega menu. A second `isDrawerOpen` state is added to the same component. On small screens (`< lg`) the flat nav is hidden and a hamburger button appears. Tapping it mounts a `MobileDrawer` component which slides in from the right as a fixed overlay. Services expands inline via a local accordion state inside the drawer.

**Tech Stack:** Next.js App Router, React `useState`/`useEffect`, Tailwind CSS, existing `navServiceGroups` from `lib/nav-services.ts`

---

### Task 1: Create the MobileDrawer component

**Files:**
- Create: `C:\Users\Rich\Desktop\ROSS\components\marketing\mobile-drawer.tsx`

**Step 1: Write the component**

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";

import { navServiceGroups } from "@/lib/nav-services";
import { navigationItems, siteConfig } from "@/lib/site-config";

type MobileDrawerProps = {
  onClose: () => void;
};

export function MobileDrawer({ onClose }: MobileDrawerProps) {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed right-0 top-0 z-50 flex h-full w-80 max-w-full flex-col bg-white shadow-2xl"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <Link
            href="/"
            onClick={onClose}
            className="text-lg font-semibold tracking-tight text-slate-950"
          >
            {siteConfig.name}
          </Link>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1">
            {navigationItems.map((item) =>
              item.label === "Services" ? (
                <li key={item.href}>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                  >
                    {item.label}
                    <svg
                      aria-hidden="true"
                      className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                    </svg>
                  </button>

                  {servicesOpen && (
                    <ul className="mt-1 space-y-3 pl-4 pb-2">
                      {navServiceGroups.map((group) => (
                        <li key={group.title}>
                          <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                            {group.title}
                          </p>
                          <ul className="mt-1 space-y-0.5">
                            {group.services.map((service) => (
                              <li key={service.href}>
                                <Link
                                  href={service.href}
                                  onClick={onClose}
                                  className="block rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                                >
                                  {service.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        {/* Footer CTA */}
        <div className="border-t border-slate-200 px-6 py-5">
          <Link
            href="/contact"
            onClick={onClose}
            className="block w-full rounded-full bg-sky-400 px-5 py-3 text-center text-sm font-medium text-slate-950 transition hover:bg-sky-300"
          >
            Book now
          </Link>
        </div>
      </div>
    </>
  );
}
```

**Step 2: Run lint**

Run: `npm run lint`

Expected: No errors.

**Step 3: Run tests**

Run: `npm test`

Expected: All existing tests pass (drawer has no unit tests needed; it is purely presentational).

---

### Task 2: Add hamburger button and drawer state to the header

**Files:**
- Modify: `C:\Users\Rich\Desktop\ROSS\components\marketing\header.tsx`

**Step 1: Add second state and drawer import**

Add `isDrawerOpen` state and import `MobileDrawer`. Extend the existing `useEffect` to close the drawer on Escape too. Add a hamburger button visible only below `lg` breakpoint.

Key additions to `header.tsx`:

```tsx
// add alongside isOpen state
const [isDrawerOpen, setIsDrawerOpen] = useState(false);

// inside the keydown handler
if (event.key === "Escape") {
  if (isOpen) {
    setIsOpen(false);
    triggerRef.current?.focus();
  }
  if (isDrawerOpen) {
    setIsDrawerOpen(false);
  }
}

// hamburger button — add inside the header bar div, after the <nav>
<button
  type="button"
  aria-label="Open navigation"
  aria-expanded={isDrawerOpen}
  onClick={() => setIsDrawerOpen(true)}
  className="ml-4 rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 lg:hidden"
>
  <svg
    aria-hidden="true"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
</button>

// hide desktop nav on mobile, show hamburger
// add hidden lg:flex to the <ul> className on the nav
// add lg:hidden to the hamburger button

// mount drawer
{isDrawerOpen && <MobileDrawer onClose={() => setIsDrawerOpen(false)} />}
```

**Step 2: Run lint**

Run: `npm run lint`

Expected: No errors.

**Step 3: Run tests**

Run: `npm test`

Expected: All 9 existing tests pass.

---

### Task 3: Final verification

**Step 1: Run full checks**

Run: `npm test`

Expected: `4 test files passed, 9 tests passed`

Run: `npm run lint`

Expected: clean

Run: `npm run build`

Expected: clean build, same 11 routes

**Step 2: Start dev server and verify manually**

Run: `npm run dev`

Check at `http://localhost:3000` in a narrow browser window (< 1024px):
- hamburger icon visible, flat nav hidden
- tapping hamburger opens the drawer from the right
- overlay dims the page
- tapping Services expands the three treatment group accordions
- tapping any service link closes the drawer
- tapping X or the overlay closes the drawer
- Escape key closes the drawer

Check at full width:
- hamburger icon hidden, flat nav visible
- mega menu still works on Services click
