"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useInView } from "framer-motion";
import { stats } from "@/lib/constants";

export default function StatsCounter() {
  const sectionRef = useRef(null);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #111111 0%, #1A1A1A 50%, #111111 100%)",
      }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gold ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container-luxury relative z-10 py-20 md:py-28">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              isLast={index === stats.length - 1}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────── Individual Stat Item ──────── */
function StatItem({ value, suffix, label, isLast, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  const animate = useCallback(() => {
    const duration = 2000; // 2 seconds
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for deceleration near end
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [value]);

  useEffect(() => {
    if (isInView) {
      animate();
    }
  }, [isInView, animate]);

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center text-center px-4"
    >
      {/* Vertical Divider — shown on lg screens, except after last item */}
      {!isLast && (
        <div
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(201,169,110,0.3), transparent)",
          }}
        />
      )}

      {/* Subtle gold glow behind number */}
      <div
        className="absolute top-2 w-24 h-24 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      {/* Animated Number */}
      <span
        className="gold-gradient-text relative z-10 font-bold leading-none mb-3"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
        }}
      >
        {displayValue}
        {suffix}
      </span>

      {/* Label */}
      <span
        className="text-sm tracking-wide uppercase"
        style={{ color: "var(--text-tertiary, #B0A99F)" }}
      >
        {label}
      </span>
    </div>
  );
}
