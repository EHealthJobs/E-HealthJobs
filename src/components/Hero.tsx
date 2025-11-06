"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden font-sans bg-gradient-to-br from-[#0a1a2f] via-[#132b4c] to-[#0c223d] text-white"
    >
      {/* Subtle gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,138,0,0.15),_transparent_60%)] -z-10" />

      <div className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-semibold leading-tight text-gray-100"
          >
            IMAGINE A FUTURE WITH
          </motion.h1>

          {/* Highlight Text */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,165,0,0.3)]"
          >
            ZERO TRAVELERS
          </motion.h2>

          {/* Supporting lines */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="pt-6 space-y-2"
          >
            <p className="text-lg md:text-xl text-gray-300 tracking-wide">
              GLOBAL RECRUITMENT
            </p>
            <p className="text-lg md:text-xl text-gray-300 tracking-wide">
              COST EFFECTIVE SOLUTIONS
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto pt-6 leading-relaxed"
          >
            With almost 2 decades in business, we've saved smart hospitals millions as they transition to their ZERO travelers goal quickly and cost effectively.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="pt-8"
          >
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-10 py-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(255,140,0,0.4)]"
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
