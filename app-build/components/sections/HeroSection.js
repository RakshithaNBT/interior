'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ------------------------------------------------------------------ */
/*  Floating Gold Particles (div-based, 25 dots)                      */
/* ------------------------------------------------------------------ */
function GoldParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setParticles(
        Array.from({ length: 25 }, (_, i) => ({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 8,
          duration: Math.random() * 10 + 12,
          opacity: Math.random() * 0.4 + 0.1,
        }))
      );
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: 'var(--gold)',
            opacity: p.opacity,
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* keyframes injected once */}
      <style jsx>{`
        @keyframes floatParticle {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: ${0.15};
          }
          25% {
            transform: translate(${12}px, -${18}px) scale(1.2);
            opacity: ${0.35};
          }
          50% {
            transform: translate(-${8}px, -${30}px) scale(0.9);
            opacity: ${0.2};
          }
          75% {
            transform: translate(${6}px, -${14}px) scale(1.1);
            opacity: ${0.3};
          }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Hero Section                                                  */
/* ------------------------------------------------------------------ */
export default function HeroSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ---------- slow zoom on background image ---------- */
      gsap.to(bgRef.current, {
        scale: 1.15,
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });

      /* ---------- parallax on scroll ---------- */
      gsap.to(bgRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      /* ---------- entrance timeline ---------- */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // label slide-up + fade
      tl.fromTo(
        labelRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );

      // heading clip-path reveal
      tl.fromTo(
        headingRef.current,
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', opacity: 0 },
        { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', opacity: 1, duration: 1.2 },
        '-=0.4'
      );

      // subtitle fade
      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      );



      // scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      );

      /* ---------- scroll-out: hero fades & moves up ---------- */
      gsap.to(contentRef.current, {
        y: -80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '60% top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* ============ BACKGROUND IMAGE ============ */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <Image
          src="/images/hero-bg.png"
          alt="Luxury interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* ============ DARK GRADIENT OVERLAY ============ */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* ============ ANIMATED GOLD GRADIENT OVERLAY ============ */}
      <div
        className="absolute inset-0 z-[1] opacity-30 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, transparent 0%, rgba(201,169,110,0.15) 30%, transparent 60%, rgba(201,169,110,0.1) 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 8s ease infinite',
        }}
      />

      {/* ============ GOLD PARTICLES ============ */}
      <GoldParticles />

      {/* ============ FLOATING DECORATIVE SHAPES ============ */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {/* Circle top-right */}
        <span
          className="absolute top-[12%] right-[10%] w-20 h-20 rounded-full border border-[var(--gold)]/30"
          style={{ animation: 'float 6s ease-in-out 0s infinite' }}
        />
        {/* Small circle left */}
        <span
          className="absolute top-[55%] left-[6%] w-10 h-10 rounded-full border border-[var(--gold)]/20"
          style={{ animation: 'float 6s ease-in-out 1.5s infinite' }}
        />
        {/* Horizontal line right */}
        <span
          className="absolute top-[40%] right-[5%] w-24 h-[1px] bg-[var(--gold)]/20"
          style={{ animation: 'float 6s ease-in-out 3s infinite' }}
        />
        {/* Diamond / rotated square */}
        <span
          className="absolute bottom-[25%] left-[15%] w-8 h-8 rotate-45 border border-[var(--gold)]/25"
          style={{ animation: 'float 6s ease-in-out 4.5s infinite' }}
        />
      </div>

      {/* ============ HERO CONTENT ============ */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-center items-center text-center px-5 sm:px-8 lg:px-16"
      >
        {/* Label */}
        <span
          ref={labelRef}
          className="inline-block mb-6 text-[var(--gold)] text-xs sm:text-sm font-[family-name:var(--font-body)] font-semibold tracking-[0.35em] uppercase opacity-0"
        >
          Luxury Interior Design
        </span>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="font-[family-name:var(--font-heading)] font-bold text-white leading-[1.1] mb-6 opacity-0"
          style={{
            fontSize: 'clamp(2.75rem, 7vw, 6rem)',
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
          }}
        >
          Where Luxury
          <br />
          Meets Living
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="max-w-xl text-white/75 text-base sm:text-lg font-[family-name:var(--font-body)] leading-relaxed mb-10 opacity-0"
        >
          We craft bespoke interiors that blend timeless elegance with modern
          sensibility — spaces designed to inspire, comfort, and endure.
        </p>


      </div>

      {/* ============ SCROLL INDICATOR ============ */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-body)]">
          Scroll
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-white/50 animate-bounce-gentle"
        >
          <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
