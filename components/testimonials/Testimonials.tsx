"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    comment: "普段何気なく行っていることがハラスメントだと知って、自分の行動を振り返るいい機会でした。",
    rating: 5,
    author: "高校1年生・男性",
    gradient: "bg-gradient-to-br from-brand-pink/10 to-white",
    shadow: "shadow-[0_5px_20px_rgba(255,191,199,0.1)]"
  },
  {
    comment: "ハラスメントの種類などを例を含め細かく説明があったので、身近なことだと認識しやすかったです。",
    rating: 4,
    author: "高校2年生・女性",
    gradient: "bg-gradient-to-br from-brand-blue/10 to-white",
    shadow: "shadow-[0_5px_20px_rgba(181,220,255,0.1)]"
  },
  {
    comment: "あーなるほどな、知らなかったな、やってしまったなとアップデートすることが沢山ありました。多くの人がこの授業を受けた方がいいと感じます。",
    rating: 5,
    author: "40代講師・男性",
    gradient: "bg-gradient-to-br from-brand-yellow/10 to-white",
    shadow: "shadow-[0_5px_20px_rgba(255,215,0,0.1)]"
  }
];

export function Testimonials() {
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
    <section className="py-24 relative overflow-hidden">
      {/* セクションの背景 - よりスムーズな統合 */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/5 via-brand-blue/5 to-brand-yellow/5"></div>
      <div className="texture-overlay"></div>
      
      {/* 装飾要素 - より広範囲のブラー効果 */}
      <div className="absolute top-0 left-0 right-0 w-full h-[500px] bg-gradient-to-b from-brand-pink/10 to-transparent opacity-30 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 right-0 w-full h-[500px] bg-gradient-to-t from-brand-blue/10 to-transparent opacity-30 blur-[100px]"></div>
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-8"
          >
            <span className="relative">
              参加者の声
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand-pink/50 via-brand-blue/50 to-brand-yellow/50"></div>
            </span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="text-lg flex items-center justify-center space-x-2 text-center mb-16"
          >
            <span className="text-muted-foreground">授業満足度</span>
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-brand-yellow text-brand-yellow" />
              <span className="ml-1 font-bold">4.8</span>
            </div>
            <span className="text-brand-pink font-semibold">(96.6%)</span>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`p-6 rounded-lg backdrop-blur-sm border border-gray-100/50 gradient-card ${testimonial.gradient} ${testimonial.shadow} transition-all duration-300`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i}
                      className="w-5 h-5 fill-brand-yellow text-brand-yellow"
                    />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i}
                      className="w-5 h-5 text-gray-300"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 relative">
                  <span className="absolute -top-2 -left-2 text-4xl text-brand-pink opacity-20">"</span>
                  {testimonial.comment}
                  <span className="absolute -bottom-4 -right-2 text-4xl text-brand-pink opacity-20">"</span>
                </p>
                <p className="text-sm font-medium text-right">
                  {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}