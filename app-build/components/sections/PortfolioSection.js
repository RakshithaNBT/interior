"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const trackRef = useRef(null);
  const pinWrapRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.3 });

  /* ── responsive check ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── filtered items ── */
  const filtered =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((p) => p.category === activeCategory);

  /* ── GSAP horizontal scroll (desktop only) ── */
  useEffect(() => {
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    // Small delay to let DOM settle after filter change
    const timer = setTimeout(() => {
      if (!trackRef.current || !pinWrapRef.current || !sectionRef.current)
        return;

      const track = trackRef.current;
      const scrollAmount = track.scrollWidth - window.innerWidth;

      if (scrollAmount <= 0) return;

      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: pinWrapRef.current,
            pin: true,
            start: "top top",
            end: () => `+=${scrollAmount}`,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [isMobile, activeCategory]);

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
              className="flex items-center justify-center rounded-full bg-[#F5F0EB]/95 dark:bg-[#151515]/95 border border-[#1A1A1A]/10 dark:border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02),0_15px_45px_rgba(0,0,0,0.06)] mx-auto w-fit z-10 backdrop-blur-xl flex-wrap"
              style={{
                padding: isMobile ? "8px 12px" : "12px 18px",
                gap: isMobile ? "8px" : "14px",
              }}
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: isMobile ? "10px 18px" : "14px 32px",
                      transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                    }}
                    className={`relative z-10 text-[10px] sm:text-xs font-semibold tracking-[0.12em] uppercase rounded-full whitespace-nowrap cursor-pointer select-none hover:scale-[1.04] active:scale-[0.96] ${
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
      {isMobile ? (
        /* ── MOBILE: vertical grid ── */
        <div className="section-padding pt-0">
          <div className="container-luxury">
            <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => (
                  <MobileCard
                    key={item.id}
                    item={item}
                    onSelect={setSelectedItem}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      ) : (
        /* ── DESKTOP: horizontal scroll ── */
        <div ref={pinWrapRef} className="relative">
          <div
            ref={trackRef}
            className="flex items-stretch gap-8 pl-[5vw] pr-[10vw] py-12 will-change-transform"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <DesktopCard
                  key={item.id}
                  item={item}
                  index={i}
                  onSelect={setSelectedItem}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selectedItem && (
          <ProjectModal
            item={selectedItem}
            isMobile={isMobile}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ═══════════════════════════ DesktopCard ═══════════════════════ */
function DesktopCard({
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
      { threshold: 0.2 }
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
      className="group relative flex-shrink-0 w-[420px] xl:w-[500px] h-[560px] xl:h-[620px] rounded-2xl overflow-hidden cursor-pointer"
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
          sizes="(max-width: 1280px) 420px, 500px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      {/* hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* glass info bar at bottom */}
      <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
        <div 
          className="backdrop-blur-xl bg-white/10 border-t border-white/20"
          style={{ padding: '24px' }}
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
      <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-lg" />
    </motion.div>
  );
}

/* ═══════════════════════════ MobileCard ════════════════════════ */
function MobileCard({
  item,
  onSelect,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.4 }}
      onClick={() => onSelect(item)}
      className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div 
        className="absolute bottom-0 inset-x-0"
        style={{ padding: '16px' }}
      >
        <span className="text-[var(--gold)] text-[10px] font-semibold tracking-[0.15em] uppercase">
          {item.category}
        </span>
        <h3 className="text-white text-sm font-[family-name:var(--font-heading)] font-bold leading-tight">
          {item.title}
        </h3>
        <p className="text-white/60 text-[10px] mt-0.5">{item.location}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════ ProjectModal ═══════════════════════ */
function ProjectModal({
  item,
  isMobile,
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
          className="relative z-10"
          style={{
            padding: isMobile ? "24px 20px" : "48px 40px",
            marginTop: "-64px"
          }}
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
