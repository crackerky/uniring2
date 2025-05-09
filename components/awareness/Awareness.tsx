"use client";

import { motion } from "framer-motion";

const harassmentExamples = [
  {
    title: "パワーハラスメント",
    description: "優位性を利用し、暴力や暴言など相手に肉体的または精神的苦痛を与える行為",
    color: "bg-brand-pink/20 border-brand-pink/30",
    shadow: "shadow-[0_4px_15px_rgba(255,191,199,0.15)]"
  },
  {
    title: "スクールハラスメント",
    description: "学校においていて相手の尊厳を傷つけたり、不快感を与えたりする言動や行為",
    color: "bg-brand-blue/20 border-brand-blue/30",
    shadow: "shadow-[0_4px_15px_rgba(181,220,255,0.15)]"
  },
  {
    title: "ハラスメントハラスメント",
    description: "正当な指導や注意に対して「ハラスメントだ」と過剰に主張する行為",
    color: "bg-brand-yellow/20 border-brand-yellow/30",
    shadow: "shadow-[0_4px_15px_rgba(255,215,0,0.15)]"
  },
];

export function Awareness() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="gradient-bg opacity-10"></div>
      <div className="texture-overlay"></div>
      
      {/* Decorative elements */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-pink opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand-blue opacity-5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-8 relative"
          >
            ハラスメントは <span className="pink-highlight font-extrabold">"70種類以上"</span> もある
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-muted-foreground text-center mb-8 sm:mb-16"
          >
            私たちの日常に潜む、さまざまな形のハラスメント
          </motion.p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {harassmentExamples.map((example, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`p-4 sm:p-6 rounded-lg border h-full flex flex-col ${example.color} ${example.shadow} backdrop-blur-sm transition-all duration-300`}
              >
                <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-primary">
                  {example.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground flex-grow">
                  {example.description}
                </p>
                <div className="w-full h-1 mt-4 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-full"></div>
              </motion.div>
            ))}
          </div>

          <motion.p 
            variants={itemVariants}
            className="mt-8 sm:mt-12 text-center text-sm sm:text-base text-muted-foreground"
          >
            これらは、70種類以上あるハラスメントのほんの一例です。
            <br className="hidden sm:block" />
            誰もが<span className="blue-highlight font-medium">加害者</span>にも<span className="pink-highlight font-medium">被害者</span>にもなり得る可能性があります。
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}