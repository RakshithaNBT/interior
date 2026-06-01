"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

/* ──────────────────── form input ──────────────────── */
function FormInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
}) {
  return (
    <div className="w-full text-left">
      <label
        htmlFor={id}
        className="block text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-2.5 font-sans"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full h-16 rounded-lg border bg-[var(--background)] px-5
          text-[var(--text-primary)] outline-none transition-all duration-300
          font-[family-name:var(--font-body)] text-base shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-[var(--border-strong)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]"
          }
        `}
        placeholder={`Enter your ${label.toLowerCase()}`}
        autoComplete="off"
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 text-xs text-red-500 font-[family-name:var(--font-body)]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────── form textarea ──────────────── */
function FormTextarea({
  id,
  label,
  value,
  onChange,
  error,
}) {
  return (
    <div className="w-full text-left">
      <label
        htmlFor={id}
        className="block text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-2.5 font-sans"
      >
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className={`
          w-full min-h-[140px] resize-none rounded-lg border bg-[var(--background)] px-5 py-5
          text-[var(--text-primary)] outline-none transition-all duration-300
          font-[family-name:var(--font-body)] text-base shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-[var(--border-strong)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]"
          }
        `}
        placeholder="Type any special requirements or notes here..."
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 text-xs text-red-500 font-[family-name:var(--font-body)]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────── form select ──────────────── */
function FormSelect({
  id,
  label,
  value,
  onChange,
  options,
  error,
}) {
  return (
    <div className="w-full text-left relative">
      <label
        htmlFor={id}
        className="block text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-2.5 font-sans"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full h-16 appearance-none rounded-lg border bg-[var(--background)] px-5
            text-[var(--text-primary)] outline-none transition-all duration-300
            font-[family-name:var(--font-body)] text-base cursor-pointer
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-[var(--border-strong)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]"
            }
          `}
        >
          <option value="" disabled>
            Select {label.toLowerCase()}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {/* chevron */}
        <svg
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 text-xs text-red-500 font-[family-name:var(--font-body)]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────── step indicator ──────────────── */
function StepIndicator({ currentStep }) {
  const steps = [
    { num: 1, label: "Personal" },
    { num: 2, label: "Project" },
    { num: 3, label: "Preferences" },
  ];

  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center">
          {/* circle */}
          <div className="flex flex-col items-center">
            <motion.div
              className={`
                flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold
                font-[family-name:var(--font-body)] transition-colors duration-500
                ${
                  currentStep >= s.num
                    ? "border-[var(--gold)] bg-[var(--gold)] text-[#1A1A1A]"
                    : "border-[var(--border-strong)] bg-transparent text-[var(--text-secondary)]"
                }
              `}
              animate={currentStep >= s.num ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              {currentStep > s.num ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                s.num
              )}
            </motion.div>
            <span
              className={`mt-2 text-xs font-[family-name:var(--font-body)] transition-colors duration-300 ${
                currentStep >= s.num ? "text-[var(--gold)] font-medium" : "text-[var(--text-secondary)]"
              }`}
            >
              {s.label}
            </span>
          </div>
          {/* connector line */}
          {i < steps.length - 1 && (
            <div className="relative mx-3 h-0.5 w-16 sm:w-24 rounded-full bg-[var(--border-strong)] -mt-5">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-[var(--gold)]"
                initial={{ width: "0%" }}
                animate={{ width: currentStep > s.num ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ──────────────── confetti dots ──────────────── */
function ConfettiDots() {
  const colors = ["#C9A96E", "#E8D5A3", "#D4AF72", "#8A8478", "#F5F0EB"];
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDots(
        Array.from({ length: 30 }, (_, i) => ({
          id: i,
          width: Math.random() * 8 + 4,
          height: Math.random() * 8 + 4,
          color: colors[i % colors.length],
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          yDest: -(Math.random() * 120 + 60),
          xDest: (Math.random() - 0.5) * 80,
          delay: Math.random() * 0.6,
        }))
      );
    }, 0);
    return () => clearTimeout(timer);
  }, [colors]);

  if (dots.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full"
          style={{
            width: d.width,
            height: d.height,
            background: d.color,
            left: d.left,
            top: d.top,
          }}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [0, d.yDest],
            x: [0, d.xDest],
          }}
          transition={{
            duration: 1.8,
            delay: d.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

/* ──────────────── success screen ──────────────── */
function SuccessScreen() {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ConfettiDots />
      <motion.div
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.svg
          className="h-12 w-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
        </motion.svg>
      </motion.div>
      <motion.h3
        className="mb-3 text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        Thank You!
      </motion.h3>
      <motion.p
        className="max-w-md text-base text-[var(--text-secondary)] font-[family-name:var(--font-body)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        Your consultation request has been received. Our design team will reach out within 24 hours to schedule your
        personalized session.
      </motion.p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function BookingSection() {
  const sectionRef = useRef(null);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    roomType: "",
    budget: "",
    timeline: "",
    styles: [],
    specialRequirements: "",
    heardFrom: "",
  });

  /* helpers */
  const set = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleStyle = (style) =>
    setForm((prev) => ({
      ...prev,
      styles: prev.styles.includes(style)
        ? prev.styles.filter((s) => s !== style)
        : [...prev.styles, style],
    }));

  /* validation */
  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!form.name.trim()) e.name = "Name is required";
      if (!form.email.trim()) e.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "Enter a valid email";
      if (!form.phone.trim()) e.phone = "Phone is required";
      else if (!/^[+]?\d{10,15}$/.test(form.phone.replace(/\s/g, "")))
        e.phone = "Enter a valid phone number";
    }
    if (step === 2) {
      if (!form.roomType) e.roomType = "Select a room type";
      if (!form.budget) e.budget = "Select a budget range";
      if (!form.timeline) e.timeline = "Select a timeline";
    }
    if (step === 3) {
      if (form.styles.length === 0) e.styles = "Select at least one style";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    setDirection(1);
    if (step < 3) setStep((s) => s + 1);
    else {
      setSubmitted(true);
    }
  };

  const back = () => {
    setDirection(-1);
    setErrors({});
    setStep((s) => s - 1);
  };

  /* GSAP entrance */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".booking-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".booking-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* slide variants */
  const variants = {
    enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  /* option data */
  const roomOptions = [
    { value: "living-room", label: "Living Room" },
    { value: "kitchen", label: "Kitchen" },
    { value: "bedroom", label: "Bedroom" },
    { value: "bathroom", label: "Bathroom" },
    { value: "full-home", label: "Full Home" },
  ];
  const budgetOptions = [
    { value: "under-5l", label: "Under ₹5L" },
    { value: "5l-10l", label: "₹5L – ₹10L" },
    { value: "10l-20l", label: "₹10L – ₹20L" },
    { value: "20l-plus", label: "₹20L+" },
  ];
  const timelineOptions = [
    { value: "1-2-months", label: "1–2 Months" },
    { value: "2-4-months", label: "2–4 Months" },
    { value: "4-6-months", label: "4–6 Months" },
    { value: "flexible", label: "Flexible" },
  ];
  const styleOptions = ["Modern", "Contemporary", "Traditional", "Minimalist", "Luxury"];
  const heardOptions = [
    { value: "social-media", label: "Social Media" },
    { value: "google", label: "Google Search" },
    { value: "referral", label: "Friend / Referral" },
    { value: "magazine", label: "Magazine / Blog" },
    { value: "other", label: "Other" },
  ];

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="section-padding relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--background) 0%, #F5F0EB 40%, var(--background) 100%)",
      }}
    >
      {/* decorative accent shapes */}
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[var(--gold)] opacity-[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-10 h-80 w-80 rounded-full bg-[var(--gold)] opacity-[0.06] blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-32 h-48 w-48 rotate-45 border border-[var(--gold)] opacity-10 rounded-3xl" />

      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Form and Header Column */}
          <div className="md:col-span-7 w-full flex flex-col justify-center">
            {/* header */}
            <div className="booking-heading mb-10 text-left">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)] font-[family-name:var(--font-body)]">
                Book Consultation
              </span>
              <h2 className="section-heading mb-4 text-3xl md:text-4xl lg:text-5xl">Begin Your Journey</h2>
              <p className="text-[var(--text-secondary)] font-[family-name:var(--font-body)] max-w-xl">
                Take the first step towards your dream interior. Fill in the details below and our
                design experts will craft a personalized plan for you.
              </p>
            </div>

            {/* form card */}
            <motion.div className="booking-card w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-lg)]">
              {submitted ? (
                <SuccessScreen />
              ) : (
                <>
                  <StepIndicator currentStep={step} />

                  {/* step content */}
                  <div className="relative min-h-[240px] sm:min-h-[270px] py-1 overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="flex flex-col gap-6"
                        >
                          <h3 className="text-xl font-semibold font-[family-name:var(--font-heading)] text-[var(--text-primary)]">
                            Personal Details
                          </h3>
                          <FormInput
                            id="name"
                            label="Full Name"
                            value={form.name}
                            onChange={(v) => set("name", v)}
                            error={errors.name}
                          />
                          <FormInput
                            id="email"
                            label="Email Address"
                            type="email"
                            value={form.email}
                            onChange={(v) => set("email", v)}
                            error={errors.email}
                          />
                          <FormInput
                            id="phone"
                            label="Phone Number"
                            type="tel"
                            value={form.phone}
                            onChange={(v) => set("phone", v)}
                            error={errors.phone}
                          />
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="flex flex-col gap-6"
                        >
                          <h3 className="text-xl font-semibold font-[family-name:var(--font-heading)] text-[var(--text-primary)]">
                            Project Details
                          </h3>
                          <FormSelect
                            id="roomType"
                            label="Room Type"
                            value={form.roomType}
                            onChange={(v) => set("roomType", v)}
                            options={roomOptions}
                            error={errors.roomType}
                          />
                          <FormSelect
                            id="budget"
                            label="Budget Range"
                            value={form.budget}
                            onChange={(v) => set("budget", v)}
                            options={budgetOptions}
                            error={errors.budget}
                          />
                          <FormSelect
                            id="timeline"
                            label="Project Timeline"
                            value={form.timeline}
                            onChange={(v) => set("timeline", v)}
                            options={timelineOptions}
                            error={errors.timeline}
                          />
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step3"
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="flex flex-col gap-8"
                        >
                          <h3 className="text-2xl font-semibold font-[family-name:var(--font-heading)] text-[var(--text-primary)]">
                            Preferences
                          </h3>

                          {/* style checkboxes */}
                          <div>
                            <p className="mb-3 text-base font-medium text-[var(--text-secondary)] font-[family-name:var(--font-body)]">
                              Preferred Styles
                            </p>
                            <div className="flex flex-wrap gap-3">
                              {styleOptions.map((style) => {
                                const active = form.styles.includes(style);
                                return (
                                  <button
                                    key={style}
                                    type="button"
                                    onClick={() => toggleStyle(style)}
                                    className={`
                                      rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300
                                      font-[family-name:var(--font-body)] cursor-pointer
                                      ${
                                        active
                                          ? "border-[var(--gold)] bg-[var(--gold)] text-[#1A1A1A]"
                                          : "border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
                                      }
                                    `}
                                  >
                                    {style}
                                  </button>
                                );
                              })}
                            </div>
                            <AnimatePresence>
                              {errors.styles && (
                                <motion.p
                                  initial={{ opacity: 0, y: -4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -4 }}
                                  className="mt-2 text-xs text-red-500 font-[family-name:var(--font-body)]"
                                >
                                  {errors.styles}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>

                          <FormTextarea
                            id="specialRequirements"
                            label="Special Requirements"
                            value={form.specialRequirements}
                            onChange={(v) => set("specialRequirements", v)}
                          />

                          <FormSelect
                            id="heardFrom"
                            label="How did you hear about us?"
                            value={form.heardFrom}
                            onChange={(v) => set("heardFrom", v)}
                            options={heardOptions}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* navigation buttons */}
                  <div className="mt-8 flex items-center justify-between">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={back}
                        className="btn-outline cursor-pointer"
                      >
                        <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        Back
                      </button>
                    ) : (
                      <div />
                    )}
                    <button type="button" onClick={next} className="btn-primary cursor-pointer">
                      {step === 3 ? "Submit" : "Next"}
                      {step < 3 && (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Right Column - Premium image with floating geometric elements (md:col-span-5) */}
          <div className="md:col-span-5 relative hidden md:block h-[450px] lg:h-[580px] w-full">
            {/* Outer golden geometric border */}
            <div className="absolute inset-4 border border-[var(--gold)]/30 rounded-2xl -translate-x-4 translate-y-4 z-0 pointer-events-none" />
            
            {/* Image Container with ambient glow */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[var(--shadow-xl)] border border-[var(--border)] z-10">
              <Image
                src="/images/portfolio-living.png"
                alt="Luxury living room"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              {/* Caption Card */}
              <div 
                className="absolute bottom-6 left-6 right-6 glass rounded-xl border border-white/10 z-20"
                style={{ padding: "1.25rem" }}
              >
                <p className="text-white/60 text-xs tracking-widest uppercase mb-1">Signature Space</p>
                <h4 className="text-white font-[family-name:var(--font-heading)] text-lg font-medium">The Living Salon</h4>
              </div>
            </div>

            {/* Decorative Floating Circles */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-[var(--gold)]/10 rounded-full blur-xl animate-pulse-glow pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[var(--gold)]/10 rounded-full blur-xl pointer-events-none" />
            

          </div>
        </div>
      </div>
    </section>
  );
}
