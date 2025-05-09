"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Users } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "自他尊重",
    description: "すべての人が安心して生活できる環境を目指します",
    color: "bg-brand-blue",
    iconColor: "#B5DCFF",
    shadowColor: "shadow-blue-glow",
    bgGradient: "bg-gradient-to-br from-brand-blue/20 to-white"
  },
  {
    icon: Heart,
    title: "未然防止",
    description: "問題が表面化する前に解決する意識を育成します",
    color: "bg-brand-pink", 
    iconColor: "#FFBFC7",
    shadowColor: "shadow-glow",
    bgGradient: "bg-gradient-to-br from-brand-pink/20 to-white"
  },
  {
    icon: Users,
    title: "探究心",
    description: "身近な気づきをきっかけに、自分らしいキャリアの一歩を支えます",
    color: "bg-brand-yellow",
    iconColor: "#FFD700",
    shadowColor: "shadow-yellow-glow",
    bgGradient: "bg-gradient-to-br from-brand-yellow/20 to-white"
  },
];

export function Mission() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* 背景要素 - より統合された */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/5 via-brand-blue/5 to-brand-yellow/5"></div>
      <div className="texture-overlay"></div>
      
      {/* 装飾要素 - より大きなブラー半径 */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-white/20 to-transparent opacity-40 blur-[50px]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-white/20 to-transparent opacity-40 blur-[50px]"></div>
      <div className="absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full bg-brand-purple/5 blur-[200px]"></div>
      <div className="absolute bottom-1/3 left-0 w-[800px] h-[800px] rounded-full bg-brand-teal/5 blur-[200px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-8 relative"
          >
            <span className="relative">
              Mission&Value
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand-pink via-brand-blue to-brand-yellow opacity-50"></div>
            </span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-muted-foreground text-center mb-8 sm:mb-16 max-w-2xl mx-auto"
          >
            私たちは、被害者にも加害者にもならないための教育を目指します
          </motion.p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`${value.color} w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-4 sm:mb-6 ${value.shadowColor} relative`}
                >
                  <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse-soft"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-70"></div>
                  <value.icon 
                    size={index === 0 ? 28 : (index === 1 ? 32 : 36)} 
                    className="sm:w-10 sm:h-10 md:w-12 md:h-12 relative z-10"
                    color={value.iconColor}
                    strokeWidth={2.5}
                  />
                </motion.div>
                <div className={`rounded-xl p-6 ${value.bgGradient} border border-gray-100/50 backdrop-blur-sm ${value.shadowColor} w-full gradient-card`}>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">{value.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={itemVariants}
            className="mt-8 sm:mt-16 text-center"
          >
            <div className="inline-block py-3 px-6 rounded-full bg-white/70 backdrop-blur-sm shadow-soft border border-gray-100/50 gradient-card">
              <p className="text-base sm:text-xl font-semibold text-primary">
                誰もが感情を大切にしながらハラスメントと向き合い
                <br className="hidden sm:block" />
                自分も相手も大切にできる社会へ
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}