"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  // Display the loader on every refresh
  useEffect(() => {
    try {
      // Clean up old storage flags from previous code
      localStorage.removeItem("eleva_loader_shown");
      sessionStorage.removeItem("eleva_loader_shown");
    } catch (e) { }

    // Lock body scrolling during load
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (!loading) return;

    const video = videoRef.current;
    if (!video) return;

    // Play video explicitly (safely caught for browser autoplay policies)
    video.play().catch((err) => {
      console.warn("Video play was blocked or failed to start:", err);
    });

    // Sync progress bar to actual video playback position
    const handleTimeUpdate = () => {
      if (video.duration && video.duration > 0) {
        const pct = Math.min((video.currentTime / video.duration) * 100, 100);
        setProgress(Math.round(pct));
      }
    };

    // Auto-dismiss when video finishes playing
    const handleEnded = () => {
      setProgress(100);
      dismissLoader();
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    // Fallback: Auto-dismiss loader after 60 seconds if video is stuck
    const timeout = setTimeout(() => {
      dismissLoader();
    }, 60000);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, [loading]);

  const dismissLoader = () => {
    setLoading(false);
  };

  const handleSkip = () => {
    dismissLoader();
  };

  // Reset scroll lock when loader fades out
  useEffect(() => {
    if (!loading) {
      document.body.style.overflow = "";
    }
  }, [loading]);



  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            opacity: 0,
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A] text-white select-none"
        >
          {/* Background Fullscreen Video */}
          <video
            ref={videoRef}
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/loading.mp4`}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ objectFit: "cover" }}
          />

          {/* Elegant Dark Overlay/Vignette for text readability */}
          <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

          {/* Ambient Gold Glow behind content */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[160px] pointer-events-none opacity-30 z-15"
            style={{
              background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)",
            }}
          />

          {/* Skip Intro Button */}
          <button
            onClick={handleSkip}
            className="absolute bottom-10 right-16 md:bottom-14 md:right-32 z-50 flex items-center rounded-full border border-white/20 bg-black/30 p-4 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition-all duration-500 hover:bg-black/60 hover:border-[var(--gold)] hover:shadow-[0_0_30px_rgba(201,169,110,0.4)] group cursor-pointer"
          >
            <div className="relative flex h-16 w-16 items-center justify-center text-white transition-transform duration-500 group-hover:scale-110 group-hover:text-[var(--gold)]">
              <span className="absolute inset-0 rounded-full animate-ping bg-white/20 group-hover:animate-none opacity-50" />
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="relative z-10 drop-shadow-md">
                <path d="M5 4l11 8-11 8z" />
                <rect x="18" y="4" width="2" height="20" />
              </svg>
            </div>
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs sm:text-sm font-semibold tracking-[0.2em] text-white transition-all duration-500 ease-out group-hover:max-w-[160px] group-hover:ml-4 group-hover:mr-3 uppercase">
              Skip Intro
            </span>
          </button>

          {/* Core Content Overlay */}
          <div className="relative flex flex-col items-between justify-between w-full h-full px-6 py-16 z-20 max-w-lg mx-auto">
            {/* Top spacer */}
            <div />

            {/* Logo / Branding in the center */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <h1
                className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold tracking-[0.25em] uppercase text-white"
                style={{ textShadow: "0 4px 15px rgba(0,0,0,0.8)" }}
              >
                ELEVA
              </h1>
              <p
                className="text-[var(--gold)] text-sm md:text-base tracking-[0.45em] uppercase mt-3 font-medium"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
              >
                Interiors
              </p>
            </motion.div>

            {/* Progress Container at the bottom */}
            <div className="w-full">
              <div className="flex justify-between items-center text-[10px] font-semibold text-white/70 tracking-[0.25em] mb-3 font-sans" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                <span>LOADING EXPERIENCE</span>
                <span className="text-[var(--gold)]">{progress}%</span>
              </div>
              <div className="h-[3px] w-full bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-[var(--gold)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
