"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brandPartners } from "@/lib/constants";

export default function BrandMarquee() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Double the list to make loop seamless
  const brands = [...brandPartners, ...brandPartners];

  return (
    <section
      ref={sectionRef}
      className="py-12 border-y border-[var(--border)] overflow-hidden relative z-10"
      style={{ background: "var(--background)" }}
    >
      <div className="relative w-full flex items-center">
        {/* Shadow overlays for smooth fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-[var(--background)] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-[var(--background)] to-transparent" />

        {/* Scrolling container */}
        <div className="flex animate-marquee whitespace-nowrap gap-12 md:gap-20 py-2">
          {brands.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-bold tracking-widest uppercase text-[var(--text-tertiary)] hover:text-[var(--gold)] transition-colors duration-300 select-none cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
