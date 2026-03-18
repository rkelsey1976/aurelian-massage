"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

import type { FaqItem } from "@/lib/services";

type FaqAccordionProps = {
  items: FaqItem[];
};

function FaqRow({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="border-b last:border-b-0"
      style={{ borderColor: "rgba(122,80,176,0.20)" }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark rounded"
      >
        <span className="font-serif text-base font-semibold leading-snug text-neutral-light sm:text-lg">
          {item.question}
        </span>
        <span
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-purple-mid transition-colors duration-200"
          style={{
            background: isOpen ? "rgba(122,80,176,0.30)" : "rgba(122,80,176,0.12)",
            border: `1px solid ${isOpen ? "rgba(122,80,176,0.55)" : "rgba(122,80,176,0.25)"}`,
          }}
          aria-hidden="true"
        >
          {isOpen ? <Minus size={13} strokeWidth={2.5} /> : <Plus size={13} strokeWidth={2.5} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-7 text-neutral-mid sm:text-base sm:leading-8">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div
      className="noise-card relative rounded-2xl px-6 sm:px-8"
      style={{
        background: "#2C1E42",
        border: "1px solid rgba(122,80,176,0.25)",
      }}
    >
      {items.map((item, i) => (
        <FaqRow
          key={item.question}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
