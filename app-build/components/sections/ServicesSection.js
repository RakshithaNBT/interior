"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services, portfolioItems } from "@/lib/constants";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

const serviceToCategory = {
  "Living Room Design": "Living Room",
  "Modular Kitchen": "Kitchen",
  "Bedroom Interiors": "Bedroom",
  "Bathroom Design": "Bathroom",
  "Home Office": "Office",
  "Complete Home": "All"
};

/* ───────── Inline SVG Icons ───────── */
const iconPaths = {
  sofa: (
    <>
      <path
        d="M4 28 C4 24, 8 22, 8 18 C8 12, 12 10, 24 10 C36 10, 40 12, 40 18 C40 22, 44 24, 44 28 L44 34 L4 34 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-path"
      />
      <path
        d="M10 34 L10 38 M38 34 L38 38"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="icon-path"
      />
      <path
        d="M14 22 L34 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="icon-path"
      />
      <path
        d="M24 22 L24 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="icon-path"
      />
    </>
  ),
  kitchen: (
    <>
      <path
        d="M10 16 C10 10, 16 6, 24 6 C32 6, 38 10, 38 16 L38 18 L10 18 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-path"
      />
      <path
        d="M8 18 L40 18 L40 22 L8 22 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        className="icon-path"
      />
      <path
        d="M12 22 L14 38 L34 38 L36 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-path"
      />
      <path
        d="M24 2 L24 6 M18 4 L18 6 M30 4 L30 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="icon-path"
      />
      <path
        d="M10 38 L38 38"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="icon-path"
      />
    </>
  ),
  bed: (
    <>
      <path
        d="M6 30 L6 14 C6 12, 8 10, 10 10 L20 10 C22 10, 24 12, 24 14 L24 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-path"
      />
      <path
        d="M4 30 L44 30 L44 24 C44 22, 42 20, 40 20 L8 20 C6 20, 4 22, 4 24 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-path"
      />
      <path
        d="M6 30 L6 36 M42 30 L42 36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="icon-path"
      />
      <path
        d="M10 20 L10 16 C10 14, 12 13, 14 13 L18 13 C20 13, 22 14, 22 16 L22 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-path"
      />
    </>
  ),
  bath: (
    <>
      <path
        d="M6 22 L42 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="icon-path"
      />
      <path
        d="M8 22 C8 32, 12 38, 24 38 C36 38, 40 32, 40 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-path"
      />
      <path
        d="M10 22 L10 12 C10 8, 14 6, 18 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-path"
      />
      <path
        d="M14 38 L12 42 M34 38 L36 42"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="icon-path"
      />
      <circle cx="22" cy="14" r="1" fill="currentColor" className="icon-path" />
      <circle cx="26" cy="12" r="1" fill="currentColor" className="icon-path" />
      <circle cx="24" cy="8" r="1" fill="currentColor" className="icon-path" />
    </>
  ),
  office: (
    <>
      <rect
        x="12"
        y="6"
        width="24"
        height="18"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="icon-path"
      />
      <rect
        x="16"
        y="10"
        width="16"
        height="10"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className="icon-path"
      />
      <path
        d="M24 24 L24 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="icon-path"
      />
      <path
        d="M16 30 L32 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="icon-path"
      />
      <path
        d="M6 38 L42 38"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="icon-path"
      />
      <path
        d="M10 38 L10 34 L38 34 L38 38"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-path"
      />
    </>
  ),
  home: (
    <>
      <path
        d="M6 22 L24 6 L42 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-path"
      />
      <path
        d="M10 22 L10 40 L38 40 L38 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-path"
      />
      <rect
        x="20"
        y="28"
        width="8"
        height="12"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="icon-path"
      />
      <circle cx="26" cy="34" r="0.8" fill="currentColor" className="icon-path" />
      <path
        d="M30 14 L36 14 L36 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-path"
      />
    </>
  ),
};

/* ───────── Card Component ───────── */
function FlipCard({ title, description, icon, index, onExplore }) {
  const cardRef = useRef(null);
  const [isTouched, setIsTouched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const preview = description.length > 70 ? description.slice(0, 70) + "…" : description;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    if (isMobile) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max tilt 12 degrees
    const tiltX = ((y - centerY) / centerY) * -12;
    const tiltY = ((x - centerX) / centerX) * 12;

    rotateX.set(tiltX);
    rotateY.set(tiltY);
  }, [isMobile, rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flip-card-container group w-full h-[380px] sm:h-[420px]"
      style={{ 
        perspective: "1200px",
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d"
      }}
      onClick={() => setIsTouched((v) => !v)}
    >
      <div
        className={`flip-card-inner relative w-full h-full transition-transform duration-700 ${
          isTouched ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 luxury-card flex flex-col items-center justify-between text-center px-6 py-10 h-full w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl"
          style={{ 
            backfaceVisibility: "hidden",
            boxShadow: "var(--shadow-md)"
          }}
        >
          {/* Top content */}
          <div className="flex flex-col items-center justify-center flex-grow">
            {/* Icon */}
            <div className="mb-6 text-[var(--gold)] w-16 h-16 flex items-center justify-center">
              <svg
                viewBox="0 0 48 44"
                fill="none"
                className="w-full h-full service-icon"
                data-index={index}
              >
                {iconPaths[icon] ?? iconPaths["home"]}
              </svg>
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold mb-3 text-[var(--text-primary)]">
              {title}
            </h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-[280px] mx-auto">
              {preview}
            </p>
          </div>
          
          {/* Bottom link */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onExplore();
            }}
            className="mt-4 inline-flex items-center text-[var(--gold)] text-xs font-semibold tracking-widest uppercase gap-1 hover:gap-2 transition-all cursor-pointer relative z-20"
          >
            Explore Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-xl flex flex-col items-center justify-between text-center px-8 py-10 h-full w-full transition-all duration-300"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "var(--glass-bg)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid var(--glass-border)",
            boxShadow: "var(--glass-shadow)",
          }}
        >
          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="w-10 h-0.5 bg-[var(--gold)] mb-6 rounded-full" />
            <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-4 text-[var(--text-primary)]">
              {title}
            </h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 max-w-[280px]">
              {description}
            </p>
          </div>
          
          <a
            href="#booking"
            className="inline-flex items-center gap-2 text-[var(--gold)] font-semibold text-sm tracking-wide hover:gap-3 transition-all duration-300"
          >
            Book Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* CSS for hover flip and unified border/shadow states on hover */}
      <style jsx>{`
        @media (hover: hover) {
          .flip-card-container:hover .flip-card-inner {
            transform: rotateY(180deg);
          }
          .flip-card-container:hover .flip-card-inner > div {
            border-color: var(--gold) !important;
            box-shadow: var(--shadow-lg) !important;
          }
          .rotate-y-180 {
            transform: rotateY(0deg) !important;
          }
        }
        @media (hover: none) {
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        }
      `}</style>
    </motion.div>
  );
}

/* ───────── Services Section ───────── */
export default function ServicesSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedService]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ── Heading animation ── */
      gsap.from(".services-heading-anim", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      /* ── Card stagger entrance ── */
      gsap.from(".service-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      /* ── SVG stroke draw animation ── */
      const allPaths = document.querySelectorAll(".service-icon .icon-path");
      allPaths.forEach((path) => {
        if (path instanceof SVGGeometryElement) {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: path.closest(".service-card"),
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Decorative BG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
        />
      </div>

      <div className="container-luxury relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="services-heading-anim inline-block text-[var(--gold)] text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Services
          </span>
          <h2 className="services-heading-anim section-heading mb-4">Our Expertise</h2>
          <p
            className="services-heading-anim section-subheading mx-auto"
            style={{
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Comprehensive interior design solutions for every space in your home
          </p>
          <div
            className="services-heading-anim gold-divider mx-auto mt-5"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center"
        >
          {services.map((service, i) => (
            <div key={service.title} className="service-card w-full max-w-[380px] sm:max-w-none md:max-w-[420px] lg:max-w-none mx-auto">
              <FlipCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={i}
                onExplore={() => setSelectedService(service.title)}
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal 
            serviceTitle={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ───────── Modal Component ───────── */
function ServiceModal({ serviceTitle, onClose }) {
  const category = serviceToCategory[serviceTitle] || "All";
  const items = category === "All" ? portfolioItems : portfolioItems.filter(p => p.category === category);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl p-6 md:p-10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-2xl md:text-4xl font-[family-name:var(--font-heading)] font-bold text-[var(--text-primary)] mb-2 text-center">
          {serviceTitle} <span className="gold-gradient-text">Portfolio</span>
        </h2>
        <div className="gold-divider mx-auto mb-8" />
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="relative aspect-[4/5] rounded-xl overflow-hidden group">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-6 pointer-events-none">
                  <span className="text-[var(--gold)] text-xs font-semibold tracking-widest uppercase mb-1 block">
                    {item.category}
                  </span>
                  <h3 className="text-white text-xl font-bold font-[family-name:var(--font-heading)] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--text-secondary)] py-12">No projects found for this category yet.</p>
        )}
      </motion.div>
    </motion.div>
  );
}
