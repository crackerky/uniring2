"use client";

import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const newsItems = [
  {
    date: "2025年4月27日",
    title: "学生団体Youth Intersection主催高校生・大学生向け交流会登壇",
    image: "https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/presentation%20view.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by9wcmVzZW50YXRpb24gdmlldy5wbmciLCJpYXQiOjE3NDg4NTgyMzUsImV4cCI6MTc4MDM5NDIzNX0.eBOBk2yJM62YcbPl1J413L4knlG9dd5FatO71iemQfw",
    link: "/news"
  },
  {
    date: "2025年4月20日",
    title: "朝日新聞社中高生新聞掲載",
    image: "https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/newspaper%20entre%20lab.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by9uZXdzcGFwZXIgZW50cmUgbGFiLnBuZyIsImlhdCI6MTc0ODg1ODc1NCwiZXhwIjoxNzgwMzk0NzU0fQ.MaNrwU3E6UFYwna4OKVvWfrbFDByzDIAkP5pK4A1ZgU",
    link: "/news"
  },
  {
    date: "2025年3月30日",
    title: "第二回ワークショップ開催・TSGプロジェクトフェア参加",
    image: "https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/view%20of%20MTG.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by92aWV3IG9mIE1URy5wbmciLCJpYXQiOjE3NDg4NTg4MjQsImV4cCI6MTc4MDM5NDgyNH0.6Yb4fGsyOgDR1u8DjirOYODhFA9sTx2JzowuQJo6bHE",
    link: "/news"
  }
];

export function News() {
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
    <section className="py-16 sm:py-24 relative">
      {/* 白い背景の上にオーバーレイグラデーション */}
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/2 via-brand-blue/2 to-brand-yellow/2"></div>
      
      {/* 上部のグラデーショントランジション */}
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent to-white/80 pointer-events-none"></div>
      
      {/* 装飾要素 - より大きなブラー半径 */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-pink/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[120px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-8">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold">お知らせ</h2>
          </motion.div>

          <motion.div variants={itemVariants} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {newsItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.link}
                className="block bg-white rounded-lg shadow-sm border border-gray-100/50 transition-all duration-200 hover:shadow-md hover:-translate-y-1 gradient-card overflow-hidden"
              >
                <div className="relative h-40 sm:h-48 image-overlay">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <time className="text-xs sm:text-sm text-muted-foreground block mb-2">
                    {item.date}
                  </time>
                  <p className="text-sm sm:text-base text-foreground line-clamp-2">
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 text-center">
            <Link 
              href="/news"
              className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2 relative group"
            >
              <span className="relative z-10">すべてのお知らせを見る</span>
              <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              <span className="absolute inset-0 bg-brand-pink/5 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}