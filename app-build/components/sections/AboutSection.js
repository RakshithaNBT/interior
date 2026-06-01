"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/constants";

export default function AboutSection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(0 100% 0 0)", scale: 1.1 },
        {
          clipPath: "inset(0 0% 0 0)",
          scale: 1,
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Text elements stagger fade in
      gsap.from(".about-fade-in", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--surface-hover)" }}
    >
      <div className="container-luxury grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image side */}
        <div
          ref={imageRef}
          className="relative w-full aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/5] rounded-xl overflow-hidden shadow-2xl group"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <Image
            src="/images/about.png"
            alt="Interior design studio work"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
        </div>

        {/* Text side */}
        <div ref={textRef} className="flex flex-col gap-6">
          <span className="about-fade-in text-[var(--gold)] text-xs md:text-sm font-semibold tracking-[0.25em] uppercase">
            About Us
          </span>
          <h2 className="about-fade-in section-heading">
            Elevating Spaces into Living Masterpieces
          </h2>
          <div className="about-fade-in gold-divider" />
          <p className="about-fade-in text-[var(--text-secondary)] text-base leading-relaxed">
            At {siteConfig.name}, we believe that a home is more than just a place to live; it is a canvas of self-expression, a sanctuary of comfort, and a reflection of your finest achievements.
          </p>
          <p className="about-fade-in text-[var(--text-secondary)] text-base leading-relaxed">
            Since our inception, we have dedicated ourselves to redefining premium luxury design. Our team of visionary designers, structural draftsmen, and master craftsmen collaborate seamlessly to bring your dream spaces to life with uncompromising quality, precision, and sophistication.
          </p>
          <div className="about-fade-in grid grid-cols-2 gap-6 mt-4">
            <div className="border-l-2 border-[var(--gold)] pl-4">
              <h4 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
                Bespoke Design
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Custom layouts & curated palettes
              </p>
            </div>
            <div className="border-l-2 border-[var(--gold)] pl-4">
              <h4 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
                10-Year Warranty
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Premium materials & execution
              </p>
            </div>
          </div>
          <div className="about-fade-in mt-6">
            <a href="#portfolio" className="btn-primary">
              Explore Our Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
