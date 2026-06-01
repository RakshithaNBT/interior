"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqs } from "@/lib/constants";

function FAQItem({ question, answer, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div className="glass rounded-2xl p-6 md:p-8 transition-all duration-500 hover:border-[var(--gold)]/50 hover:shadow-[0_8px_30px_rgba(201,169,110,0.12)] border border-[var(--border)]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left focus:outline-none group cursor-pointer"
      >
        <span className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-medium text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors duration-300 pr-4">
          {question}
        </span>
        <span className="text-[var(--gold)] shrink-0 transition-transform duration-500">
          {isOpen ? (
            // Minus icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          ) : (
            // Plus icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed pt-4 pb-2 max-w-3xl">
          {answer}
        </p>
      </div>
    </div>
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
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading and CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left lg:sticky lg:top-28">
            <span className="faq-anim inline-block text-[var(--gold)] text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4">
              FAQ
            </span>
            <h2 className="faq-anim section-heading mb-4 text-left">Common Inquiries</h2>
            <div className="faq-anim gold-divider mt-6 mb-6" />
            
            <p className="faq-anim section-subheading mt-6 text-left" style={{ maxWidth: "100%" }}>
              Everything you need to know about our luxury interior design process, custom furniture fabrication, timelines, and tailored styling packages.
            </p>

            {/* Custom CTA Box */}
            <div className="faq-anim mt-10 p-6 rounded-xl border border-[var(--border)] glass relative overflow-hidden group">
              {/* Subtle background highlight */}
              <div className="absolute -inset-x-20 -inset-y-20 bg-[var(--gold)]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-medium text-[var(--text-primary)] mb-2 relative z-10">Have a custom question?</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-5 relative z-10">Our design consultants are ready to discuss your specific project needs and layout specifications.</p>
              <a href="#booking" className="btn-primary inline-flex items-center text-xs py-3 px-6 relative z-10">
                <span>Book Consultation</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1 duration-300">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7 faq-anim w-full">
            <div className="flex flex-col gap-6">
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
