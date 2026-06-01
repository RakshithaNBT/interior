"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/lib/constants";

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <motion.div
      layout="position"
      className={`glass rounded-2xl p-7 md:p-8 lg:p-9 border transition-all duration-500 cursor-pointer select-none ${isOpen
        ? "border-[var(--gold)]/60 bg-[var(--surface-hover)] shadow-[0_15px_45px_rgba(201,169,110,0.06)]"
        : "border-[var(--border)] hover:border-[var(--gold)]/35 hover:shadow-[0_12px_35px_rgba(0,0,0,0.02)] hover:-translate-y-0.5"
        }`}
      onClick={onToggle}
    >
      <div className="w-full flex items-center justify-between text-left focus:outline-none group">
        <span
          className={`font-[family-name:var(--font-heading)] text-lg md:text-xl font-medium tracking-wide transition-colors duration-300 pr-6 ${isOpen ? "text-[var(--gold)]" : "text-[var(--text-primary)] group-hover:text-[var(--gold)]"
            }`}
        >
          {question}
        </span>
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 shrink-0 ${isOpen
            ? "border-[var(--gold)] bg-[var(--gold)] text-[#1A1A1A] rotate-90"
            : "border-[var(--border-strong)] text-[var(--gold)] group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)]/5"
            }`}
        >
          {isOpen ? (
            // Minus icon
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          ) : (
            // Plus icon
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm md:text-[15px] lg:text-base text-[var(--text-secondary)] font-light leading-relaxed pt-6 pb-2 max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".faq-anim", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-28 lg:py-32"
      style={{ background: "var(--background)" }}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-[var(--gold)]/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-[500px] h-[500px] bg-[var(--gold)]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 xl:gap-28 items-start">

          {/* Left Column: Heading and CTA */}
          <div className="lg:col-span-5 flex flex-col justify-start text-left lg:sticky lg:top-32 self-start">
            <span className="faq-anim inline-block text-[var(--gold)] text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-4">
              Inquiries
            </span>
            <h2 className="faq-anim font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[var(--text-primary)] leading-[1.1] mb-8">
              Common <span className="gold-gradient-text italic font-normal">Questions</span>
            </h2>
            <div className="faq-anim w-16 h-[2px] bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)] my-8" />
            
            <p className="faq-anim text-base md:text-[17px] text-[var(--text-secondary)] font-light leading-relaxed max-w-lg mb-12">
              Everything you need to know about our luxury interior design process, bespoke furniture execution, timelines, and turn-key packages.
            </p>

            {/* Custom CTA Box (Enlarged and Spaced) */}
            <div className="faq-anim mt-10 p-9 md:p-12 rounded-2xl border border-[var(--border)] glass relative overflow-hidden group shadow-[0_25px_60px_rgba(0,0,0,0.02)] hover:border-[var(--gold)]/35 transition-all duration-500">
              {/* Premium top accent gold line */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)] z-10" />
              
              {/* Subtle background highlight */}
              <div className="absolute -inset-x-20 -inset-y-20 bg-[var(--gold)]/3 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-medium text-[var(--text-primary)] mb-4 relative z-10">
                Have a custom question?
              </h3>
              <p className="text-base text-[var(--text-secondary)] font-light leading-relaxed mb-9 relative z-10">
                Our design consultants are ready to discuss your specific project needs and layout specifications.
              </p>

              <a
                href="#booking"
                className="relative z-10 w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-hover)] text-[#1A1A1A] font-semibold text-xs tracking-wider uppercase shadow-[0_8px_25px_rgba(201,169,110,0.12)] hover:shadow-[0_15px_35px_rgba(201,169,110,0.28)] hover:-translate-y-0.5 active:translate-y-0 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group/btn cursor-pointer"
              >
                <span>Book Consultation</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="transition-transform group-hover/btn:translate-x-1 duration-300"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7 faq-anim w-full">
            <div className="flex flex-col gap-7 md:gap-8">
              {faqs.map((faq, idx) => (
                <FAQItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === idx}
                  onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
