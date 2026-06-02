"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform, useMotionTemplate, animate } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BeforeAfterSection() {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Motion value for slider position (0 to 100)
  const sliderPosition = useMotionValue(50);
  
  // Smooth spring physics for a premium feel
  const smoothPosition = useSpring(sliderPosition, {
    stiffness: 180,
    damping: 25,
    mass: 0.3
  });

  // Derived templates for CSS clipPath and handle position
  const insetPercent = useTransform(smoothPosition, (val) => 100 - val);
  const clipPath = useMotionTemplate`inset(0 ${insetPercent}% 0 0)`;
  const handleLeft = useMotionTemplate`${smoothPosition}%`;

  /* ── Calculate position from pointer / touch ── */
  const updatePosition = useCallback(
    (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.min(Math.max((x / rect.width) * 100, 0), 100);
      sliderPosition.set(pct);
    },
    [sliderPosition]
  );

  /* ── Mouse handlers ── */
  const onMouseDown = useCallback(
    (e) => {
      setIsDragging(true);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    };
    const onMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, updatePosition]);

  /* ── Touch handlers ── */
  const onTouchStart = useCallback(
    (e) => {
      setIsDragging(true);
      if (e.touches && e.touches[0]) {
        updatePosition(e.touches[0].clientX);
      }
    },
    [updatePosition]
  );

  useEffect(() => {
    const onTouchMove = (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        updatePosition(e.touches[0].clientX);
      }
    };
    const onTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onTouchEnd);
    }
    return () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, updatePosition]);

  /* ── GSAP & Framer Motion entrance animation ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading stagger
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Zoom/Scale animation on scroll
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { scale: 0.94, opacity: 0.8 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 95%",
              end: "bottom 70%",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    // Smoothly animate the handle from 5% to 50% when section enters viewport
    if (isInView) {
      animate(sliderPosition, 50, {
        from: 5,
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1] // Custom easeOutExpon
      });
    }

    return () => ctx.revert();
  }, [isInView, sliderPosition]);

  return (
    <section
      id="before-after"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div className="container-luxury">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--gold)" }}
          >
            Before &amp; After
          </span>
          <h2 className="section-heading mb-4">The Transformation</h2>
          <div
            className="gold-divider mx-auto"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
          <p
            className="section-subheading mt-4 mx-auto"
            style={{
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Drag the slider to witness the dramatic transformation our designers
            bring to every space.
          </p>
        </div>

        {/* Comparison Slider Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-6xl mx-auto"
        >
          <div
            ref={containerRef}
            className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden select-none mx-auto"
            style={{
              boxShadow:
                "0 30px 70px rgba(0,0,0,0.2), 0 0 0 1px var(--border)",
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            {/* Glass Border Overlay & Soft Inner Shadow */}
            <div 
              className="absolute inset-0 pointer-events-none z-10 border border-white/20 rounded-2xl" 
              style={{
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.15)",
              }}
            />
            
            {/* After Image (full, underneath - Right half of combined image) */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 bottom-0 right-0 w-[200%] h-full">
                <Image
                  src="/interior/images/before-after-combined.png"
                  alt="After transformation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 200vw, 2048px"
                  priority
                />
              </div>
            </div>

            {/* Before Image (clipped by slider position - Left half of combined image) */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath,
              }}
            >
              <div className="absolute top-0 bottom-0 left-0 w-[200%] h-full">
                <Image
                  src="/interior/images/before-after-combined.png"
                  alt="Before transformation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 200vw, 2048px"
                  priority
                />
              </div>
            </motion.div>

            {/* Labels */}
            <div
              className="absolute top-6 left-6 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-white z-10"
              style={{
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
              }}
            >
              Before
            </div>
            <div
              className="absolute top-6 right-6 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-white z-10"
              style={{
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
              }}
            >
              After
            </div>

            {/* Divider Line */}
            <motion.div
              className="absolute top-0 bottom-0 w-[2px] z-20 pointer-events-none"
              style={{
                left: handleLeft,
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(180deg, transparent 0%, var(--gold) 10%, var(--gold) 90%, transparent 100%)",
              }}
            />

            {/* Drag Handle */}
            <motion.div
              className="absolute top-1/2 z-30 flex items-center justify-center"
              style={{
                left: handleLeft,
                transform: "translate(-50%, -50%)",
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--gold), #E8D5A3)",
                boxShadow:
                  "0 4px 20px rgba(201,169,110,0.5), 0 0 0 4px rgba(255,255,255,0.3)",
                cursor: isDragging ? "grabbing" : "grab",
                touchAction: "none",
              }}
            >
              {/* Left Arrow */}
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  d="M8 1L2 7L8 13"
                  stroke="#1A1A1A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* Right Arrow */}
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1"
              >
                <path
                  d="M2 1L8 7L2 13"
                  stroke="#1A1A1A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
