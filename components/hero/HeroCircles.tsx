"use client";

import { motion } from "framer-motion";

export function HeroCircles() {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative aspect-square w-full flex items-center justify-center"
      >
        {/* Gradient circle logo */}
        <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-brand-pink via-brand-blue to-brand-yellow relative z-10 flex items-center justify-center">
          <span className="text-6xl md:text-8xl font-bold text-white">Ü</span>
        </div>
      </motion.div>
    </div>
  );
}