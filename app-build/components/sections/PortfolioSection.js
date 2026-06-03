"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { portfolioItems } from "@/lib/constants";

const categories = [
  "All",
  "Living Room",
  "Kitchen",
  "Bedroom",
  "Bathroom",
  "Office",
];

/* ──────────────────────────── component ──────────────────────── */
export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.3 });

  /* ── filtered items ── */
  const filtered =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((p) => p.category === activeCategory);

  /* ── lock body scroll when modal open ── */
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  /* ──────────────────────────── render ──────────────────────────── */
  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative bg-[var(--background)] overflow-hidden"
    >
      {/* ── Header ── */}
      <div ref={headingRef} className="section-padding pb-8 md:pb-12">
        <div className="container-luxury text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs md:text-sm font-semibold tracking-[0.25em] text-gold uppercase mb-4"
          >
            Portfolio
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="section-heading mb-4"
          >
            Our <span className="gold-gradient-text">Masterpieces</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="section-subheading mx-auto mb-10"
            style={{
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Each project is a unique expression of our clients&apos; vision,
            brought to life with meticulous craftsmanship and design excellence.
          </motion.p>

          {/* ── Filter Tabs (Luxury Toggle Switch) ── */}
          <div className="w-full flex justify-center items-center my-12 z-20 relative px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center justify-center rounded-full bg-[#F5F0EB]/95 dark:bg-[#151515]/95 border border-[#1A1A1A]/10 dark:border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02),0_15px_45px_rgba(0,0,0,0.06)] mx-auto w-fit z-10 backdrop-blur-xl flex-wrap p-2 md:p-3 gap-2 md:gap-3"
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative z-10 text-[10px] sm:text-xs font-semibold tracking-[0.12em] uppercase rounded-full whitespace-nowrap cursor-pointer select-none hover:scale-[1.04] active:scale-[0.96] transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] py-2.5 px-4 md:py-3.5 md:px-8 ${
                      isActive
                        ? "text-[#1A1A1A] font-bold"
                        : "text-[#8A8478] hover:text-[#1A1A1A] dark:text-[#9B9590] dark:hover:text-[#F0EDE8]"
                    }`}
                  >
                    {cat}
                    {isActive && (
                      <motion.span
                        layoutId="portfolioActiveTab"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#C9A96E] to-[#B8944E] dark:from-[#D4AF72] dark:to-[#E0C08A] shadow-[0_6px_20px_rgba(201,169,110,0.4)] -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Gallery ── */}
      <div className="section-padding pt-0">
        <div className="container-luxury">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <ProjectCard
                  key={item.id}
                  item={item}
                  index={i}
                  onSelect={setSelectedItem}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selectedItem && (
          <ProjectModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ═══════════════════════════ ProjectCard ═══════════════════════ */
function ProjectCard({
  item,
  index,
  onSelect,
}) {
  const cardRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  /* clip-path reveal on scroll */
  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={() => onSelect(item)}
      className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* image with clip-path reveal */}
      <div
        className="absolute inset-0 transition-[clip-path] duration-[1.2s] ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{
          clipPath: revealed ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
        }}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      {/* hover overlay (always slightly dark on mobile, full dark hover on desktop) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:opacity-0 lg:group-hover:opacity-100 opacity-100 transition-opacity duration-500" />

      {/* glass info bar at bottom */}
      <div className="absolute bottom-0 inset-x-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] translate-y-0">
        <div 
          className="lg:backdrop-blur-xl bg-transparent lg:bg-white/10 lg:border-t lg:border-white/20 p-6"
        >
          <span className="text-[var(--gold)] text-xs font-semibold tracking-[0.2em] uppercase">
            {item.category}
          </span>
          <h3 className="text-white text-xl font-[family-name:var(--font-heading)] font-bold mt-1">
            {item.title}
          </h3>
          <p className="text-white/70 text-sm mt-1">{item.location}</p>
        </div>
      </div>

      {/* corner accent */}
      <div className="absolute top-4 right-4 w-8 h-8 lg:w-10 lg:h-10 border-t-2 border-r-2 border-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-lg" />
    </motion.div>
  );
}

/* ═══════════════════════════ ProjectModal ═══════════════════════ */
function ProjectModal({
  item,
  onClose,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* content card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 40 }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl"
      >
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* hero image */}
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
        </div>

        {/* info */}
        <div 
          className="relative z-10 p-6 md:p-12 -mt-8 md:-mt-16"
        >
          <span className="text-[var(--gold)] text-xs font-semibold tracking-[0.2em] uppercase">
            {item.category}
          </span>
          <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-heading)] font-bold text-[var(--text-primary)] mt-2 mb-4">
            {item.title}
          </h2>
          <div className="gold-divider" />
          <p className="text-[var(--text-secondary)] leading-relaxed mt-4 mb-6">
            {item.description}
          </p>

          <div 
            className="flex flex-wrap text-sm"
            style={{ gap: "24px" }}
          >
            <div>
              <span className="text-[var(--text-tertiary)] block mb-1">
                Area
              </span>
              <span className="text-[var(--text-primary)] font-semibold">
                {item.area}
              </span>
            </div>
            <div>
              <span className="text-[var(--text-tertiary)] block mb-1">
                Location
              </span>
              <span className="text-[var(--text-primary)] font-semibold">
                {item.location}
              </span>
            </div>
            <div>
              <span className="text-[var(--text-tertiary)] block mb-1">
                Category
              </span>
              <span className="text-[var(--text-primary)] font-semibold">
                {item.category}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
