"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { roomCategories } from "@/lib/constants";

/* ═══════════════════════════ Section ═══════════════════════════ */
export default function RoomCategories() {
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.3 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.15 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="rooms"
      className="section-padding relative bg-[var(--background)] overflow-hidden"
    >
      {/* subtle background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[var(--gold)] opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="container-luxury relative z-10">
        {/* ── Heading ── */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs md:text-sm font-semibold tracking-[0.25em] text-gold uppercase mb-4"
          >
            Categories
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="section-heading mb-4"
          >
            Explore By <span className="gold-gradient-text">Room</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="gold-divider mx-auto"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        {/* ── Grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          style={{ perspective: "1000px" }}
        >
          {roomCategories.map((room, i) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 60 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {isMobile ? (
                <MobileRoomCard room={room} />
              ) : (
                <TiltRoomCard room={room} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════ TiltRoomCard (Desktop) ═══════════ */
function TiltRoomCard({ room }) {
  const cardRef = useRef(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  const handleMouseMove = useCallback(
    (e) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // max tilt 10deg
      const tiltX = ((y - centerY) / centerY) * -10;
      const tiltY = ((x - centerX) / centerX) * 10;

      rotateX.set(tiltX);
      rotateY.set(tiltY);

      // glare position (percentage)
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    },
    [rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setGlarePos({ x: 50, y: 50 });
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ scale: { duration: 0.35, ease: [0.23, 1, 0.32, 1] } }}
      className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* background image */}
      <Image
        src={room.image}
        alt={room.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* glare / shine overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
        }}
      />

      {/* content */}
      <div
        className="absolute bottom-0 inset-x-0"
        style={{ transform: "translateZ(30px)", padding: "28px" }}
      >
        <h3 className="text-white text-xl md:text-2xl font-[family-name:var(--font-heading)] font-bold mb-1">
          {room.name}
        </h3>
        <p className="text-[var(--gold)] text-sm font-medium tracking-wide">
          {room.count}
        </p>
      </div>

      {/* top-right corner accent */}
      <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-md" />

      {/* bottom-left corner accent */}
      <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-md" />
    </motion.div>
  );
}

/* ═══════════════════════════ MobileRoomCard ════════════════════ */
function MobileRoomCard({ room }) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group active:scale-[0.97]"
    >
      <Image
        src={room.image}
        alt={room.name}
        fill
        sizes="100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />

      <div 
        className="absolute bottom-0 inset-x-0"
        style={{ padding: "20px" }}
      >
        <h3 className="text-white text-lg font-[family-name:var(--font-heading)] font-bold mb-1">
          {room.name}
        </h3>
        <p className="text-[var(--gold)] text-xs font-medium tracking-wide">
          {room.count}
        </p>
      </div>
    </motion.div>
  );
}
