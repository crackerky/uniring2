"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center overflow-hidden py-12 sm:py-24">
      <div className="gradient-bg opacity-70"></div>
      <div className="texture-overlay"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-[10%] w-24 h-24 bg-brand-pink opacity-10 rounded-full blur-2xl animate-pulse-soft"></div>
      <div className="absolute bottom-40 right-[15%] w-32 h-32 bg-brand-blue opacity-10 rounded-full blur-2xl animate-pulse-soft"></div>
      <div className="absolute top-1/2 left-[80%] w-16 h-16 bg-brand-yellow opacity-10 rounded-full blur-2xl animate-pulse-soft"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-tight"
                variants={fadeIn}
              >
                <span className="pink-highlight">加害者</span>も<span className="blue-highlight">被害者</span>も
              </motion.h1>
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-16 tracking-tight"
                variants={fadeIn}
              >
                <span className="yellow-highlight">つくらない社会</span>を目指す
              </motion.h1>
              
              <motion.div
                variants={fadeIn}
                className="inline-block"
              >
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 bg-black text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg hover:bg-black/90 transition-colors relative overflow-hidden"
                >
                  <span className="relative z-10">Üniringについて</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-pink via-brand-blue to-brand-yellow opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </Link>
              </motion.div>
            </div>

            <motion.div
              variants={fadeIn}
              className="relative order-first md:order-last mt-4 md:mt-0"
            >
              <div className="relative aspect-square w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                <div className="absolute -inset-4 bg-white/30 rounded-full blur-2xl"></div>
                <div className="absolute -inset-0 bg-gradient-to-br from-brand-pink/20 via-brand-blue/20 to-brand-yellow/20 rounded-full blur-md animate-pulse-soft"></div>
                {/* Replacing local logo with placeholder circle logo */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-brand-pink via-brand-blue to-brand-yellow relative z-10 flex items-center justify-center">
                    <span className="text-4xl md:text-6xl font-bold text-white">Ü</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            variants={fadeIn}
            className="mt-12 sm:mt-16 text-center"
          >
            <div className="inline-block bg-white/80 backdrop-blur-sm px-6 py-4 rounded-lg shadow-soft border border-brand-pink/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/10 via-brand-blue/10 to-brand-yellow/10"></div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary relative z-10">
                高校生発、ハラスメント未然防止教育プログラム
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}