"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const OPENING_DATE = new Date("2026-05-19T10:00:00");

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-2xl sm:h-28 sm:w-28 md:h-32 md:w-32"
        style={{
          background: "rgba(197,165,86,0.08)",
          border: "1px solid rgba(197,165,86,0.25)",
          boxShadow: "0 0 32px rgba(197,165,86,0.10) inset",
        }}
      >
        <span className="font-serif text-3xl font-light tabular-nums text-gold-accent sm:text-5xl md:text-6xl">
          {value}
        </span>
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-mid/50 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function CountdownClock() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(OPENING_DATE));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTimeLeft(getTimeLeft(OPENING_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  const isOpen = OPENING_DATE.getTime() <= Date.now();

  if (isOpen) {
    return (
      <p className="font-serif text-2xl font-light text-gold-accent">
        We are open — book your treatment today.
      </p>
    );
  }

  return (
    <div className="flex items-end gap-4 sm:gap-6 md:gap-8" aria-live="polite" aria-label="Countdown to opening">
      <Unit value={String(timeLeft.days)} label="Days" />
      <span className="mb-10 text-2xl font-light text-gold-accent/40 sm:mb-14 sm:text-4xl">:</span>
      <Unit value={pad(timeLeft.hours)} label="Hours" />
      <span className="mb-10 text-2xl font-light text-gold-accent/40 sm:mb-14 sm:text-4xl">:</span>
      <Unit value={pad(timeLeft.minutes)} label="Minutes" />
      <span className="mb-10 text-2xl font-light text-gold-accent/40 sm:mb-14 sm:text-4xl">:</span>
      <Unit value={pad(timeLeft.seconds)} label="Seconds" />
    </div>
  );
}
