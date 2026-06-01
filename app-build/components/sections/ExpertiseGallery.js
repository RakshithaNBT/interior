"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { expertiseCategories } from "@/lib/expertiseData";

export default function ExpertiseGallery({ data }) {
  const [activeCategory, setActiveCategory] = useState(expertiseCategories[0].id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !data) return null;

  const currentImages = data.gallery[activeCategory] || [];

  return (
    <section className="section-padding py-16 bg-[var(--background)]">
      <div className="container-luxury mx-auto px-4">
        
        {/* Pills Filter */}
        <div className="flex flex-wrap gap-4 items-center justify-center mb-12">
          {expertiseCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  relative flex items-center gap-3 pr-5 pl-1.5 py-1.5 rounded-full border transition-all duration-300
                  ${
                    isActive
                      ? "bg-[var(--gold)]/20 border-[var(--gold)] text-[var(--gold)]"
                      : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--gold)]/50 hover:text-[var(--text-primary)]"
                  }
                `}
              >
                {/* Thumbnail Image */}
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={cat.thumbnail}
                    alt={cat.label}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                
                <span className="text-sm font-semibold tracking-wide font-[family-name:var(--font-body)]">
                  {cat.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="pillIndicator"
                    className="absolute inset-0 rounded-full border border-[var(--gold)] pointer-events-none"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="wait">
            {currentImages.map((src, idx) => (
              <motion.div
                key={`${activeCategory}-${idx}`}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden shadow-[var(--shadow-lg)] group"
              >
                <Image
                  src={src}
                  alt={`${data.title} - ${activeCategory} ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
