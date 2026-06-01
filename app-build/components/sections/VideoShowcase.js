"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const scenes = [
  {
    id: 1,
    title: "The Living Salon",
    focus: "Floating Ceilings & Integrated Cove Lights",
    description: "Plush modular layout detailed with integrated warm cove lighting, luxury partition work, and elegant floating ceiling architecture.",
    image: "/images/portfolio-living.png",
  },
  {
    id: 2,
    title: "Bespoke Culinary Haven",
    focus: "Fluted Wood Modular Kitchen",
    description: "Architectural fluted wood cabinetry, custom double-layered white quartz island countertops, and seamless flush built-in appliances.",
    image: "/images/portfolio-kitchen.png",
  },
  {
    id: 3,
    title: "The Couture Bedroom",
    focus: "Suede Architectural Feature Wall",
    description: "Hand-finished wall suede panelling detailed with dual gold brass sconces, ambient lighting tracks, and matching floating joinery.",
    image: "/images/portfolio-bedroom.png",
  },
  {
    id: 4,
    title: "Sanctuary En-Suite",
    focus: "Bookmatched Marble Bathroom",
    description: "Exquisite veined bookmatched marble wall slab cladding, double backlit floating mirrors, and premium knurled matte gold fixtures.",
    image: "/images/portfolio-bathroom.png",
  },
  {
    id: 5,
    title: "The Dining Lounge",
    focus: "Venetian Plaster Ceilings & Feature Wall",
    description: "Premium Venetian plaster textures, a custom metal geometric visual screen, and a cascading warm crystal chandelier design.",
    image: "/images/about.png",
  },
];

function CinematicTour({ onClose, modeSwitcher }) {
  const [activeScene, setActiveScene] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [soundOn, setSoundOn] = useState(false);

  const durationPerScene = 6000; // 6 seconds per scene
  const totalDuration = durationPerScene * scenes.length; // 30 seconds total
  const visualizerBars = Array.from({ length: 8 }, (_, i) => i);

  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50; // update progress every 50ms for smooth rendering
    const progressStep = (intervalTime / totalDuration) * 100;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + progressStep;
        if (nextProgress >= 100) {
          // Loop back to start
          setActiveScene(0);
          return 0;
        }
        
        // Calculate active scene based on progress
        const currentProgressMs = (nextProgress / 100) * totalDuration;
        const newSceneIndex = Math.floor(currentProgressMs / durationPerScene);
        if (newSceneIndex !== activeScene && newSceneIndex < scenes.length) {
          setActiveScene(newSceneIndex);
        }

        return nextProgress;
      });
    }, intervalTime);

    return () => clearInterval(progressInterval);
  }, [isPaused, activeScene]);

  // Jump to specific scene
  const handleSceneSelect = (index) => {
    setActiveScene(index);
    setProgress((index * durationPerScene / totalDuration) * 100);
  };

  return (
    <div className="absolute inset-0 bg-[#0A0A0A] overflow-hidden rounded-xl flex flex-col justify-between p-6 md:p-8 z-30 select-none">
      {/* Background Cinematic Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: 1, 
              scale: 1.02,
              x: [-10, 0],
              y: [-5, 0]
            }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={scenes[activeScene].image}
              alt={scenes[activeScene].title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Cinema shading overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/70 z-10 pointer-events-none" />
      </div>

      {/* TOP HEADER OVERLAY */}
      <div className="relative z-20 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center w-full">
        {/* Brand name / Live tour watermark */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/90 font-sans">
            ELEVA CINEMATIC TOUR
          </span>
        </div>

        {/* Dynamic Mode Switcher */}
        {modeSwitcher}

        {/* Action Controls (Sound, Close) */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSoundOn(!soundOn)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-white hover:bg-black/60 transition-colors cursor-pointer"
          >
            <span>Sound</span>
            <div className="flex items-end gap-[2px] h-3 w-4">
              {visualizerBars.map((bar) => (
                <motion.div
                  key={bar}
                  className="w-[2px] bg-[var(--gold)] rounded-full"
                  animate={{
                    height: soundOn ? [2, 12, 4, 10, 2] : [2, 2]
                  }}
                  transition={{
                    duration: 0.6 + bar * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </button>

          {/* Close button */}
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* CENTER SCENE INFORMATION OVERLAY */}
      <div className="relative z-20 flex flex-col justify-end items-start max-w-lg mt-auto text-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* Upper label */}
            <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--gold)] uppercase mb-2 font-sans">
              SCENE {String(scenes[activeScene].id).padStart(2, '0')} — {scenes[activeScene].focus}
            </span>
            
            {/* Title */}
            <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-medium text-white mb-2 leading-tight">
              {scenes[activeScene].title}
            </h3>

            {/* Description */}
            <p className="text-xs md:text-sm text-white/70 leading-relaxed font-[family-name:var(--font-body)]">
              {scenes[activeScene].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM CONTROLS & TIMELINE PROGRESS OVERLAY */}
      <div className="relative z-20 flex flex-col gap-4 w-full mt-6">
        {/* Progress bar */}
        <div className="h-[2px] w-full bg-white/20 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-[var(--gold)] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Lower control deck */}
        <div className="flex items-center justify-between w-full">
          {/* Play / Pause button */}
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-2 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {isPaused ? (
              <>
                <svg className="w-4.5 h-4.5 text-[var(--gold)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Resume Tour</span>
              </>
            ) : (
              <>
                <svg className="w-4.5 h-4.5 text-[var(--gold)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
                <span>Pause Tour</span>
              </>
            )}
          </button>

          {/* Scene selector pills */}
          <div className="flex items-center gap-1.5 md:gap-3">
            {scenes.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => handleSceneSelect(idx)}
                className={`
                  h-6 px-2.5 rounded-full text-[9px] font-bold tracking-widest transition-all duration-300 cursor-pointer
                  ${
                    activeScene === idx
                      ? "bg-[var(--gold)] text-[#1A1A1A]"
                      : "bg-black/40 border border-white/10 text-white/50 hover:text-white/80"
                  }
                `}
              >
                0{scene.id}
              </button>
            ))}
          </div>

          {/* Tour Timer */}
          <div className="text-[10px] font-bold tracking-wider text-white/60 font-sans">
            {String(Math.floor((progress / 100) * 30)).padStart(2, '0')}s / 30s
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tourMode, setTourMode] = useState("native"); // "native" or "youtube"
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const videoContainerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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

      // Parallax on video container
      if (videoContainerRef.current) {
        gsap.fromTo(
          videoContainerRef.current,
          { y: 60 },
          {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: videoContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--background) 0%, var(--surface-hover) 50%, var(--background) 100%)",
      }}
    >
      {/* Ambient Blur Glow behind the video */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] bg-[var(--gold)]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading and Craft Description */}
          <div ref={headingRef} className="lg:col-span-5 flex flex-col justify-center text-left">
            <span
              className="inline-block text-xs font-semibold tracking-[0.3em] uppercase mb-4"
              style={{ color: "var(--gold)" }}
            >
              Video Tour
            </span>
            <h2 className="section-heading mb-4 text-left">Experience Our Craft</h2>
            <div className="gold-divider" />
            
            <p className="section-subheading mt-6 text-left" style={{ maxWidth: "100%" }}>
              Step inside our world of design and craftsmanship through an exclusive behind-the-scenes tour.
            </p>
            
            <p
              className="text-base leading-relaxed mt-6"
              style={{ color: "var(--text-secondary)" }}
            >
              Every project begins with a story. Our team of master designers and
              skilled artisans pour meticulous attention into each detail — from
              handpicked materials to bespoke furniture — creating spaces that
              transcend ordinary living. This is craftsmanship elevated to art.
            </p>

            {/* Cinematic Craft Steps List */}
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full border border-[var(--gold)]/30 flex items-center justify-center text-xs font-semibold text-[var(--gold)]">I</span>
                <span className="text-sm font-medium text-[var(--text-primary)]">Bespoke Material Selection</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full border border-[var(--gold)]/30 flex items-center justify-center text-xs font-semibold text-[var(--gold)]">II</span>
                <span className="text-sm font-medium text-[var(--text-primary)]">Artisanal Joinery & Execution</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full border border-[var(--gold)]/30 flex items-center justify-center text-xs font-semibold text-[var(--gold)]">III</span>
                <span className="text-sm font-medium text-[var(--text-primary)]">Final Styling & Curation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Video Container with Cinematic Framing */}
          <div className="lg:col-span-7 w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-2xl"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Cinematic Framing Container */}
                <div 
                  className="relative p-2 md:p-3 rounded-2xl bg-charcoal shadow-2xl border border-[var(--gold)]/25"
                  style={{
                    boxShadow: "0 0 30px var(--gold-glow), 0 25px 60px rgba(0,0,0,0.4)"
                  }}
                >
                  {/* Subtle Inner Glow Border */}
                  <div className="absolute inset-1 border border-white/5 rounded-xl pointer-events-none z-20" />

                  <div
                    ref={videoContainerRef}
                    className="relative rounded-xl overflow-hidden z-10"
                    style={{
                      aspectRatio: "16 / 9",
                    }}
                  >
                    {/* Gold border glow */}
                    <div
                      className="absolute -inset-[1px] rounded-xl pointer-events-none z-20"
                      style={{
                        border: "1px solid rgba(201,169,110,0.25)",
                        background: "transparent",
                      }}
                    />

                    <AnimatePresence mode="wait">
                      {!isPlaying ? (
                        <motion.div
                          key="poster"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 cursor-pointer group"
                          onClick={() => setIsPlaying(true)}
                        >
                          {/* Poster Image */}
                          <Image
                            src="/images/hero-bg.png"
                            alt="Video tour preview"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            priority
                          />

                          {/* Dark overlay */}
                          <div
                            className="absolute inset-0 z-10"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)",
                            }}
                          />

                          {/* Play Button */}
                          <div className="absolute inset-0 z-20 flex items-center justify-center">
                            <div className="relative flex items-center justify-center">
                              {/* Pulse rings */}
                              <span
                                className="absolute rounded-full animate-pulse-glow"
                                style={{
                                  width: "120px",
                                  height: "120px",
                                  background: "rgba(201,169,110,0.1)",
                                }}
                              />
                              <span
                                className="absolute rounded-full"
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  background: "rgba(201,169,110,0.15)",
                                  animation: "pulse-glow 2s ease-in-out 0.5s infinite",
                                }}
                              />

                              {/* Play circle */}
                              <div
                                className="relative flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  background:
                                    "linear-gradient(135deg, var(--gold), #E8D5A3)",
                                  boxShadow:
                                    "0 8px 30px rgba(201,169,110,0.4)",
                                }}
                              >
                                {/* Play triangle */}
                                <svg
                                  width="28"
                                  height="32"
                                  viewBox="0 0 28 32"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="ml-1"
                                >
                                  <path
                                    d="M26 14.268C27.3333 15.0378 27.3333 16.9623 26 17.7321L4 30.4282C2.66667 31.198 1 30.2358 1 28.6962L1 3.30385C1 1.76425 2.66667 0.802047 4 1.57185L26 14.268Z"
                                    fill="#1A1A1A"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* "Watch the Tour" label */}
                          <div className="absolute bottom-8 left-0 right-0 z-20 text-center">
                            <span className="text-white/80 text-sm font-medium tracking-widest uppercase font-[family-name:var(--font-body)]">
                              Watch the Tour
                            </span>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="absolute inset-0 bg-[#0A0A0A] rounded-xl z-30 overflow-hidden">
                          {tourMode === "native" ? (
                            <CinematicTour
                              onClose={() => setIsPlaying(false)}
                              modeSwitcher={
                                <div className="flex items-center bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-1 z-30 shadow-lg">
                                  <button
                                    onClick={() => setTourMode("native")}
                                    className={`px-3.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                                      tourMode === "native"
                                        ? "bg-[var(--gold)] text-[#1A1A1A] shadow-md font-extrabold"
                                        : "text-white/60 hover:text-white"
                                    }`}
                                  >
                                    Portfolio Tour
                                  </button>
                                  <button
                                    onClick={() => setTourMode("youtube")}
                                    className={`px-3.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                                      tourMode === "youtube"
                                        ? "bg-[var(--gold)] text-[#1A1A1A] shadow-md font-extrabold"
                                        : "text-white/60 hover:text-white"
                                    }`}
                                  >
                                    Luxury Trends Film
                                  </button>
                                </div>
                              }
                            />
                          ) : (
                            <div className="absolute inset-0 bg-[#0A0A0A] overflow-hidden rounded-xl flex flex-col justify-between select-none">
                              {/* Header Overlay - Statically docked inside flex */}
                              <div className="w-full bg-black/80 backdrop-blur-md px-6 py-3 border-b border-white/10 z-40 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                                  <span className="text-[9px] font-bold tracking-[0.25em] text-white/90 font-sans">
                                    TRENDS FILM
                                  </span>
                                </div>

                                {/* Mode Switcher */}
                                <div className="flex items-center bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-1 z-30 shadow-lg">
                                  <button
                                    onClick={() => setTourMode("native")}
                                    className={`px-3.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                                      tourMode === "native"
                                        ? "bg-[var(--gold)] text-[#1A1A1A] shadow-md font-extrabold"
                                        : "text-white/60 hover:text-white"
                                    }`}
                                  >
                                    Portfolio Tour
                                  </button>
                                  <button
                                    onClick={() => setTourMode("youtube")}
                                    className={`px-3.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                                      tourMode === "youtube"
                                        ? "bg-[var(--gold)] text-[#1A1A1A] shadow-md font-extrabold"
                                        : "text-white/60 hover:text-white"
                                    }`}
                                  >
                                    Luxury Trends Film
                                  </button>
                                </div>

                                <button 
                                  onClick={() => setIsPlaying(false)}
                                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>

                              {/* YouTube Iframe Embed - taking maximum space */}
                              <div className="flex-1 w-full bg-black p-2 sm:p-4">
                                <iframe
                                  src="https://www.youtube.com/embed/gF6Fqo1GN9Y?autoplay=1&rel=0&modestbranding=1"
                                  title="Luxury Modern Living Room Tour"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                  className="w-full h-full rounded-lg border border-white/5 shadow-2xl"
                                  style={{ border: "none" }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
