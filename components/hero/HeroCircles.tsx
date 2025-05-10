"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroCircles() {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative aspect-square w-full"
      >
        <Image
          src="/logo-placeholder.png" 
          alt="Üniring Logo"
          fill
          priority
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}