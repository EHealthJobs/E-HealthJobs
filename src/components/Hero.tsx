"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="hero-mesh-bg relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent text-white font-sans"
    >
      {/* Base mesh background */}
      <div className="hero-mesh-band" />
      <div className="hero-mesh-wave" />
      <div className="hero-grid-floor" />

      {/* Soft top highlight / curvature */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/15 via-white/5 to-transparent mix-blend-soft-light opacity-70" />

      {/* Floating glow blobs (parallax-style motion) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-10 h-52 w-52 rounded-full bg-blue-400/35 blur-3xl"
        animate={{ y: [0, 25, 0], x: [0, 10, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-24 right-0 h-64 w-64 rounded-full bg-purple-400/30 blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, -15, 0], opacity: [0.4, 0.85, 0.4] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-1/3 h-60 w-60 rounded-full bg-orange-400/35 blur-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {/* Tiny particles */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <div className="absolute left-[18%] top-[28%] h-1.5 w-1.5 rounded-full bg-white/70" />
        <div className="absolute left-[72%] top-[22%] h-1 w-1 rounded-full bg-cyan-200/80" />
        <div className="absolute left-[60%] top-[40%] h-1 w-1 rounded-full bg-amber-200/80" />
        <div className="absolute left-[30%] top-[50%] h-1 w-1 rounded-full bg-white/60" />
        <div className="absolute left-[80%] top-[55%] h-1.5 w-1.5 rounded-full bg-fuchsia-200/75" />
      </motion.div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wide"
          >
            IMAGINE A FUTURE WITH
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="mt-4 text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#ffb02e]"
          >
            ZERO TRAVELERS
          </motion.h2>

          {/* PILL */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 flex justify-center"
          >
            <div className="inline-flex items-center rounded-full bg-[#1c2d82]/90 px-10 py-3 text-xs md:text-sm tracking-[0.18em] uppercase text-slate-100 shadow-[0_16px_35px_rgba(0,0,0,0.75)] border border-white/15 backdrop-blur-[2px]">
              GLOBAL RECRUITMENT · COST EFFECTIVE SOLUTIONS
            </div>
          </motion.div>

          {/* BODY COPY */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 text-base md:text-lg text-slate-100 leading-relaxed"
          >
            With almost 2 decades in business, we've saved smart hospitals
            millions as they transition to their ZERO travelers goal quickly and
            cost effectively.
          </motion.p>

          {/* CTA BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10"
          >
            <Button
              size="lg"
              className="rounded-full bg-[#ff8a1f] px-10 py-5 text-lg font-semibold text-white shadow-[0_18px_45px_rgba(0,0,0,0.75)] hover:bg-[#ff9d3a] hover:shadow-[0_24px_60px_rgba(0,0,0,0.9)] transition-all duration-300"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
