"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/lib/constants";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function TestimonialSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!headingRef.current) return;

      const children = headingRef.current.children;
      gsap.fromTo(
        children,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--background) 0%, var(--surface-hover) 50%, var(--background) 100%)",
      }}
    >
      {/* Subtle decorative elements */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, var(--gold-light) 0%, transparent 50%), radial-gradient(circle at 80% 70%, var(--gold-light) 0%, transparent 50%)",
        }}
      />

      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--gold)" }}
          >
            Testimonials
          </span>
          <h2 className="section-heading mb-4">What Our Clients Say</h2>
          <div className="gold-divider mx-auto" style={{ marginLeft: "auto", marginRight: "auto" }} />
          <p
            className="section-subheading mx-auto mt-4"
            style={{
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Hear from homeowners who trusted us to transform their spaces into
            extraordinary living experiences.
          </p>
        </div>

        {/* Swiper Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, pauseOnMouseEnter: true }}
            slidesPerView={1}
            spaceBetween={30}
            pagination={{ clickable: true }}
            loop={true}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-14"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────── Testimonial Card ──────── */
function TestimonialCard({ testimonial }) {
  return (
    <div
      className="glass rounded-2xl p-8 h-full flex flex-col justify-between transition-all duration-500 hover:translate-y-[-4px]"
      style={{
        boxShadow: "var(--shadow-md)",
        border: "1px solid var(--glass-border)",
        minHeight: "380px",
      }}
    >
      {/* Quote Icon */}
      <div>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-5"
        >
          <path
            d="M10.8333 23.3333C10.8333 20.5719 13.0719 18.3333 15.8333 18.3333V18.3333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V11.6667C17.5 10.7462 16.7538 10 15.8333 10H10.8333C7.51963 10 4.83333 12.6863 4.83333 16V23.3333C4.83333 26.647 7.51963 29.3333 10.8333 29.3333H11.5C13.341 29.3333 14.8333 27.841 14.8333 26V26C14.8333 24.8954 13.938 24 12.8333 24H12.5C11.5795 24 10.8333 23.2538 10.8333 22.3333V23.3333Z"
            fill="var(--gold)"
            opacity="0.8"
          />
          <path
            d="M27.5 23.3333C27.5 20.5719 29.7386 18.3333 32.5 18.3333V18.3333C33.4205 18.3333 34.1667 17.5871 34.1667 16.6667V11.6667C34.1667 10.7462 33.4205 10 32.5 10H27.5C24.1863 10 21.5 12.6863 21.5 16V23.3333C21.5 26.647 24.1863 29.3333 27.5 29.3333H28.1667C30.0076 29.3333 31.5 27.841 31.5 26V26C31.5 24.8954 30.6046 24 29.5 24H29.1667C28.2462 24 27.5 23.2538 27.5 22.3333V23.3333Z"
            fill="var(--gold)"
            opacity="0.8"
          />
        </svg>

        {/* Testimonial Text */}
        <p
          className="italic text-sm leading-relaxed mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          &ldquo;{testimonial.content}&rdquo;
        </p>

        {/* Star Rating */}
        <div className="flex gap-1 mb-6">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <svg
              key={i}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="var(--gold)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Client Info */}
      <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
        {/* Avatar */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{
            background: "linear-gradient(135deg, var(--gold), #E8D5A3)",
          }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <p
            className="font-semibold text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            {testimonial.name}
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}
