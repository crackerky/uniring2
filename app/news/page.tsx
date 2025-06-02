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
    date: "2025年4月27日",
    title: "学生団体Youth Intersection主催高校生・大学生向け交流会登壇",
    image: "https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/presentation%20view.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by9wcmVzZW50YXRpb24gdmlldy5wbmciLCJpYXQiOjE3NDg4NTgyMzUsImV4cCI6MTc4MDM5NDIzNX0.eBOBk2yJM62YcbPl1J413L4knlG9dd5FatO71iemQfw",
    content: "Youth Intersection主催の交流会に登壇し、ハラスメント未然防止の重要性について講演を行いました。多くの高校生・大学生と意見交換を行い、有意義な時間となりました。"
  },
  {
    id: 2,
    date: "2025年4月20日",
    title: "朝日新聞社中高生新聞掲載",
    image: "https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/newspaper%20entre%20lab.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by9uZXdzcGFwZXIgZW50cmUgbGFiLnBuZyIsImlhdCI6MTc0ODg1ODc1NCwiZXhwIjoxNzgwMzk0NzU0fQ.MaNrwU3E6UFYwna4OKVvWfrbFDByzDIAkP5pK4A1ZgU",
    content: "朝日新聞社中高生新聞に、私たちの活動が掲載されました。高校生による未然防止教育の取り組みとして、大きな反響をいただいています。"
  },
  {
    id: 3,
    date: "2025年3月30日",
    title: "第二回ワークショップ開催・TSGプロジェクトフェア参加",
    image: "https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/view%20of%20MTG.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by92aWV3IG9mIE1URy5wbmciLCJpYXQiOjE3NDg4NTg4MjQsImV4cCI6MTc4MDM5NDgyNH0.6Yb4fGsyOgDR1u8DjirOYODhFA9sTx2JzowuQJo6bHE",
    content: "第二回ワークショップを開催し、31名の方にご参加いただきました。また、TSGプロジェクトフェアにも参加し、多くの方に活動を知っていただく機会となりました。"
  },
  {
    id: 4,
    date: "2025年3月24日",
    title: "クラウドファンディング目標達成",
    image: "https://images.pexels.com/photos/7376/startup-photos.jpg",
    content: "クラウドファンディングが目標金額を達成しました。24名の支援者の方々からご支援いただき、目標金額の104%を達成することができました。"
  },
  {
    id: 5,
    date: "2025年2月22日",
    title: "マイプロジェクトアワード地域summit advanced出場",
    image: "https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/MY%20PROJECT%20AWARD.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by9NWSBQUk9KRUNUIEFXQVJELnBuZyIsImlhdCI6MTc0ODg1ODI5OSwiZXhwIjoxNzgwMzk0Mjk5fQ.XQ0a3xXo1vcbwsZ_i-Tm6won-vgiaQlshzrDnbYTysk",
    content: "「ハラスメントのメタ認知」をテーマに、マイプロジェクトアワード地域summit advancedに出場しました。"
  },
  {
    id: 6,
    date: "2025年2月14日",
    title: "マイプロジェクトアワード特別賞受賞",
    image: "https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/presentation%20.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by9wcmVzZW50YXRpb24gLnBuZyIsImlhdCI6MTc0ODg1ODUzOSwiZXhwIjoxNzgwMzk0NTM5fQ.pfPdziTB3njSjw2TsgxMrDejun11Y1L6NwJPXld7GaM",
    content: "「ハラスメントを楽しく学ぼう〜アカハラはイグハラ〜」というテーマで発表を行い、マイプロジェクトアワードで特別賞を受賞しました。"
  },
  {
    id: 7,
    date: "2025年1月20日",
    title: "第一回ワークショップ開催",
    image: "https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/presentation%20.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by9wcmVzZW50YXRpb24gLnBuZyIsImlhdCI6MTc0ODg1ODYwMiwiZXhwIjoxNzgwMzk0NjAyfQ.ian1ghvi2W3RxJYHbeLWvqIyl22QrG-PoAJw0bJbGNc",
    content: "第一回ワークショップを開催し、多くの方にご参加いただきました。"
  },
  {
    id: 8,
    date: "2024年3月",
    title: "TOKYO EDUCATION LAB主催「起業LAB」最終プレゼンテーション大会最優秀賞受賞",
    image: "https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/REWARD.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by9SRVdBUkQucG5nIiwiaWF0IjoxNzQ4ODU4NDkwLCJleHAiOjE3ODAzOTQ0OTB9.EDW1mZ5yySANMic56n6IZi8-hulI3dt4pyissdm6SOE",
    content: "探究プログラムとの出会いから始まった取り組みが評価され、最優秀賞を受賞することができました。"
  },
  {
    id: 9,
    date: "2023年5月",
    title: "Üniring結成",
    image: "https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/club.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by9jbHViLnBuZyIsImlhdCI6MTc0ODg1ODQzNCwiZXhwIjoxNzgwMzk0NDM0fQ.rMKAvdu5e3ipkOZMOqKSewpA4W92jbZDIWIbxMpP1wY",
    content: "創設原点となる団体の結成。ハラスメント未然防止教育の重要性を認識し、活動を開始しました。"
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
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedArticle?.title}
            </DialogTitle>
            <time className="text-sm text-muted-foreground block mt-2">
              {selectedArticle?.date}
            </time>
          </DialogHeader>
          <div className="relative h-64 my-4">
            {selectedArticle && (
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                fill
                className="object-cover rounded-lg"
              />
            )}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {selectedArticle?.content}
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}