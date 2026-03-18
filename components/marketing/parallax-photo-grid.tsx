"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Photo = {
  src: string;
  alt: string;
};

type ParallaxPhotoGridProps = {
  photos: Photo[];
};

function ParallaxPhoto({
  photo,
  index,
  containerRef,
}: {
  photo: Photo;
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Each photo gets a subtly different parallax speed for depth
  const speeds = [-45, -28, -55, -35];
  const speed = speeds[index] ?? -35;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [speed * -0.5, speed * 0.5],
  );

  const isHero = index === 0;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${isHero ? "row-span-2" : ""}`}
      style={{ minHeight: isHero ? "420px" : "200px" }}
    >
      <motion.div className="absolute inset-[-12%]" style={{ y }}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center grayscale transition-[filter] duration-700 hover:grayscale-0"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, transparent 60%, rgba(32,21,46,0.45) 100%)",
        }}
      />
    </div>
  );
}

export function ParallaxPhotoGrid({ photos }: ParallaxPhotoGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative grid grid-cols-2 gap-3">
      {photos.map((photo, i) => (
        <ParallaxPhoto
          key={photo.src}
          photo={photo}
          index={i}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}
