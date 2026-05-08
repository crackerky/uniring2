"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface NewsArticle {
  id: number;
  date: string;
  title: string;
  image: string;
  content: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    date: "2026年3月25日",
    title: "Üniring 2nd Anniversary party 開催",
    image: "/images/uniring/20260325-2nd-anniversary.jpg",
    content: "Üniring 2周年を記念したパーティーを開催しました。これまでご支援いただいた多くの方々と、これからの展望を共有する機会となりました。"
  },
  {
    id: 2,
    date: "2026年3月15日",
    title: "【ワークショップ開催】プロジェクトフェア",
    image: "/images/uniring/20260315-project-fair.jpg",
    content: "プロジェクトフェアでワークショップを開催し、多くの参加者にハラスメント未然防止についてお伝えしました。"
  },
  {
    id: 3,
    date: "2026年2月2日",
    title: "【ワークショップ開催】駒場学園高校ウェルビーイング委員会研修",
    image: "/images/uniring/20260202-wellbeing-training.jpg",
    content: "駒場学園高校ウェルビーイング委員会の研修にて、ハラスメントの未然防止について研修を実施しました。"
  },
  {
    id: 4,
    date: "2025年11月30日",
    title: "【ワークショップ開催】Tokyo Startup Gatewayプロジェクト・フェア出展",
    image: "/images/uniring/20251130-tsg-fair.jpg",
    content: "Tokyo Startup Gatewayのプロジェクト・フェアに出展し、活動を多くの方に知っていただく機会となりました。"
  },
  {
    id: 5,
    date: "2025年9月8日",
    title: "【ワークショップ開催】駒場学園高校 起業LAB 5期",
    image: "/images/uniring/20250908-komaba-kigyo-lab5.jpg",
    content: "駒場学園高校の起業LAB 5期生に向けたワークショップを開催しました。"
  },
  {
    id: 6,
    date: "2025年8月3日",
    title: "【ワークショップ開催】Tokyo Startup Gatewayプロジェクト・フェア出展",
    image: "/images/uniring/20250803-tsg-fair.jpg",
    content: "Tokyo Startup Gatewayのプロジェクト・フェアに出展しました。"
  },
  {
    id: 7,
    date: "2025年6月28日",
    title: "株式会社iGO主催 EDUVISON 2025 登壇",
    image: "/images/uniring/20250628-eduvision2025.jpg",
    content: "株式会社iGO主催の EDUVISON 2025 に登壇し、ハラスメント未然防止教育の重要性についてお話ししました。"
  },
  {
    id: 8,
    date: "2025年4月30日",
    title: "東京新聞掲載",
    image: "/images/uniring/20250430-tokyo-shimbun.jpg",
    content: "東京新聞に掲載されました。若者主体の社会貢献活動として取り上げていただきました。"
  },
  {
    id: 9,
    date: "2025年4月29日",
    title: "朝日新聞掲載",
    image: "/images/uniring/20250429-asahi-shimbun.jpg",
    content: "朝日新聞に掲載されました。ハラスメント防止に取り組む若者たちの特集で取り上げられました。"
  },
  {
    id: 10,
    date: "2025年4月20日",
    title: "朝日新聞社中高生新聞掲載",
    image: "/images/uniring/20250420-asahi-junior.jpg",
    content: "朝日新聞社中高生新聞に、私たちの活動が掲載されました。高校生による未然防止教育の取り組みとして、大きな反響をいただいています。"
  },
  {
    id: 11,
    date: "2025年3月30日",
    title: "【ワークショップ開催】Tokyo Startup Gatewayプロジェクト・フェア出展",
    image: "/images/uniring/20250330-tsg-fair.jpg",
    content: "TSGプロジェクトフェアに出展し、多くの方に活動を知っていただく機会となりました。"
  },
  {
    id: 12,
    date: "2025年3月24日",
    title: "クラウドファンディング目標達成",
    image: "/images/uniring/20250324-crowdfunding-success.png",
    content: "クラウドファンディングが目標金額を達成しました。24名の支援者の方々からご支援いただき、目標金額の104%を達成することができました。"
  },
  {
    id: 13,
    date: "2025年2月22日",
    title: "マイプロジェクトアワード地域summit advanced出場",
    image: "/images/uniring/20250222-myproject-summit.jpg",
    content: "「ハラスメントのメタ認知」をテーマに、マイプロジェクトアワード地域summit advancedに出場しました。"
  },
  {
    id: 14,
    date: "2025年2月14日",
    title: "マイプロジェクトアワード特別賞受賞",
    image: "/images/uniring/20250214-myproject-award.jpg",
    content: "「ハラスメントを楽しく学ぼう〜アカハラはイグハラ〜」というテーマで発表を行い、マイプロジェクトアワードで特別賞を受賞しました。"
  },
  {
    id: 15,
    date: "2025年2月14日",
    title: "クラウドファンディング開始",
    image: "/images/uniring/20250214-crowdfunding-start.jpg",
    content: "ハラスメント未然防止教育の活動を支えるクラウドファンディングを開始しました。"
  },
  {
    id: 16,
    date: "2025年1月20日",
    title: "【ワークショップ開催】駒場学園高校 起業LAB 4期",
    image: "/images/uniring/20250120-komaba-kigyo-lab4.jpg",
    content: "駒場学園高校の起業LAB 4期生に向けた第一回ワークショップを開催し、多くの方にご参加いただきました。"
  },
  {
    id: 17,
    date: "2024年3月25日",
    title: "TOKYO EDUCATION LAB主催「起業LAB」最終プレゼンテーション大会最優秀賞受賞",
    image: "/images/uniring/20240325-kigyo-lab-grandprix.jpg",
    content: "探究プログラムとの出会いから始まった取り組みが評価され、最優秀賞を受賞することができました。"
  }
];

export default function NewsPage() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

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
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            お知らせ
          </motion.h1>

          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {newsArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                className="bg-card rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="relative h-48 bg-muted/30">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <time className="text-sm text-muted-foreground block mb-2">
                    {article.date}
                  </time>
                  <h2 className="text-lg font-semibold line-clamp-2">
                    {article.title}
                  </h2>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <div className="p-6 pb-0">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl font-bold pr-8 leading-snug">
                {selectedArticle?.title}
              </DialogTitle>
              <time className="text-sm text-muted-foreground block mt-2">
                {selectedArticle?.date}
              </time>
            </DialogHeader>
          </div>
          {selectedArticle && (
            <div className="flex justify-center bg-muted/30 mx-6 rounded-lg overflow-hidden">
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                width={1600}
                height={1200}
                className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
                unoptimized
              />
            </div>
          )}
          <div className="px-6 pb-6">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {selectedArticle?.content}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}