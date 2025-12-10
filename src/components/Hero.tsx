"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[80vh] bg-slate-950 text-white overflow-hidden"
    >
      {/* Background image + dark overlay (no more hard split) */}
      <div className="absolute inset-0">
        {/* Full-width hero image, anchored to the right */}
        <div
          className="absolute inset-0 bg-cover bg-[center_right]"
          style={{ backgroundImage: "url('/images/hero-medical-team.jpg')" }}
        />

        {/* Single gradient overlay to darken left side for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* LEFT COLUMN */}
          <div className="w-full lg:max-w-[640px]">
            {/* Top badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 border border-white/10 px-4 py-2 text-xs md:text-sm text-slate-100 mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Trusted by hospitals and health systems across the U.S.
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-slate-50"
            >
              Imagine a Future{" "}
              <span className="block">
                with{" "}
                <span className="text-amber-400 font-extrabold">
                  Zero Travelers
                </span>
              </span>
            </motion.h1>

            {/* Supporting copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-base md:text-lg text-slate-200/90 leading-relaxed"
            >
              With almost 2 decades in business, we&apos;ve saved smart
              hospitals millions as they transition to their ZERO travelers goal
              quickly and cost effectively.
            </motion.p>

            {/* Feature chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 border border-slate-700 px-4 py-2 text-sm text-slate-100">
                <span className="h-5 w-5 rounded-full bg-amber-400/20 flex items-center justify-center text-xs">
                  🧭
                </span>
                Global Recruitment
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 border border-slate-700 px-4 py-2 text-sm text-slate-100">
                <span className="h-5 w-5 rounded-full bg-emerald-400/20 flex items-center justify-center text-xs">
                  $
                </span>
                {/* Cost Effective Boost Quality Scores */}
                Cost-Effective Ways to Boost Quality Scores
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button
                size="lg"
                className="rounded-full bg-amber-500 hover:bg-amber-600 text-white px-8 py-5 text-base font-semibold shadow-[0_18px_45px_rgba(0,0,0,0.8)]"
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

          {/* RIGHT COLUMN – STATS CARDS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex flex-col gap-4 ml-auto"
          >
            <div className="w-[260px] rounded-2xl bg-slate-900/80 border border-slate-700/80 px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-md">
              <p className="text-xs text-slate-400 mb-1">Cost savings per hire</p>
              <p className="text-slate-50">Save <b>$250k-$350k per RN</b> vs. travelers over 4 years</p>
            </div>

            <div className="w-[260px] rounded-2xl bg-slate-900/85 border border-slate-700/80 px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-md translate-x-6">
              <p className="text-xs text-slate-400 mb-1">Long-Term Retention</p>
              <p className="text-slate-50"><b>4 and 10-year</b> commitment models</p>
            </div>

            <div className="w-[260px] rounded-2xl bg-amber-500/90 border border-amber-300/60 px-5 py-4 shadow-[0_24px_70px_rgba(0,0,0,0.9)] backdrop-blur-md translate-x-12">
              <p className="text-xs text-slate-900/80 mb-1">H-1Bs for RNs</p>
              <p className="font-bold text-white"><b>100% approval rate to date</b> with our immigration partners</p>
            </div>

            <div className="w-[260px] rounded-2xl bg-slate-900/85 border border-slate-700/80 px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-md translate-x-3">
              <p className="text-xs text-slate-400 mb-1">Reduced Upfront Cost</p>
              <p className="text-slate-50"><b>24+ month</b> payment options available</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
