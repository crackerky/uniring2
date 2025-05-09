"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function Contact() {

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
      {/* Background effects */}
      <div className="gradient-bg opacity-10"></div>
      <div className="texture-overlay"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl"></div>
      
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
              お問い合わせ
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand-pink/50 via-brand-blue/50 to-brand-yellow/50"></div>
            </span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
          >
            ご質問やご相談がございましたら、お気軽に
            <Link 
              href="https://lin.ee/FxjKTyN" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-primary/80 hover:underline relative inline-block px-1"
            >
              <span className="relative z-10">こちら</span>
              <span className="absolute inset-0 bg-brand-pink/10 rounded blur-sm"></span>
            </Link>
            からお問い合わせください
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              variants={itemVariants} 
              className="space-y-8"
            >
              <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-brand-pink/20 shadow-soft">
                <div className="bg-gradient-to-br from-brand-pink to-brand-pink/70 p-3 rounded-full shadow-glow">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">メールアドレス</h3>
                  <p className="text-muted-foreground">uniring2025@gmail.com</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              className="space-y-8"
            >
              <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-brand-blue/20 shadow-soft">
                <div className="bg-gradient-to-br from-brand-blue to-brand-blue/70 p-3 rounded-full shadow-blue-glow">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">所在地</h3>
                  <p className="text-muted-foreground">
                    〒110-0005<br />
                    東京都台東区上野3丁目16-2<br />
                    天翔上野末広町ビル702<br />
                    (株)TOKYO EDUCATION LAB内
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              className="space-y-8"
            >
              <Alert className="bg-white/80 backdrop-blur-sm border-brand-yellow/30 shadow-yellow-glow">
                <AlertCircle className="h-4 w-4 text-brand-yellow" />
                <AlertDescription className="text-muted-foreground">
                  通常2営業日以内にご返信いたします。
                </AlertDescription>
              </Alert>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}