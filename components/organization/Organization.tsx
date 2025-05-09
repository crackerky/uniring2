"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export function Organization() {
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
      {/* 背景のグラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-brand-pink/5"></div>
      
      {/* 装飾要素 - より広範囲のブラー効果 */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-white/30 to-transparent opacity-80 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-white/30 to-transparent opacity-80 blur-[100px]"></div>
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full bg-white/10 backdrop-blur-[2px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-16">
            <Building2 className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">団体概要</h2>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm border border-gray-100/50 gradient-card"
          >
            <dl className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <dt className="font-semibold">団体名</dt>
                <dd className="text-muted-foreground md:col-span-2">Üniring</dd>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <dt className="font-semibold">共同代表</dt>
                <dd className="text-muted-foreground md:col-span-2">寺井葉南・石橋舞優</dd>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <dt className="font-semibold">所在地</dt>
                <dd className="text-muted-foreground md:col-span-2">
                  〒110-0005<br />
                  東京都台東区上野3丁目16-2<br />
                  天翔上野末広町ビル702<br />
                  (株)TOKYO EDUCATION LAB内
                </dd>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <dt className="font-semibold">メールアドレス</dt>
                <dd className="text-muted-foreground md:col-span-2">uniring2025@gmail.com</dd>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <dt className="font-semibold">SNS</dt>
                <dd className="text-muted-foreground md:col-span-2">
                  Instagram：uniring_study<br />
                  Facebook：Uniring Study
                </dd>
              </div>
            </dl>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}