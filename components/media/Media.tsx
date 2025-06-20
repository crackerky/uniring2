"use client";

import { motion } from "framer-motion";
import { Newspaper, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const mediaAppearances = [
  {
    outlet: "朝日新聞社中高生新聞",
    date: "2025年4月20日",
    description: "高校生による未然防止教育の取り組みが紹介されました",
    url: "https://www.asahi.com/asagakuplus/article/asachuko/15714542",
    image: "https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/newspaper.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by9uZXdzcGFwZXIucG5nIiwiaWF0IjoxNzQ4ODU4MjY5LCJleHAiOjE3ODAzOTQyNjl9.l4WCm7FE5qHW4eYcaRgMxFwyypuOOoQ3gqzrRIt5Kwc"
  },
  {
    outlet: "朝日新聞",
    date: "2025年4月15日", 
    description: "ハラスメント防止に取り組む若者たちの特集で掲載されました",
    url: "https://www.asahi.com/articles/DA3S16203954.html",
    image: "https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/newspaper%20entre%20lab.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by9uZXdzcGFwZXIgZW50cmUgbGFiLnBuZyIsImlhdCI6MTc0ODg1ODc1NCwiZXhwIjoxNzgwMzk0NzU0fQ.MaNrwU3E6UFYwna4OKVvWfrbFDByzDIAkP5pK4A1ZgU"
  },
  {
    outlet: "東京新聞",
    date: "2025年4月10日",
    description: "若者主体の社会貢献活動として取り上げられました",
    url: "https://www.tokyo-np.co.jp/article/401780?rct=national",
    image: "https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/news%20paper%20harssment.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYjUzMTc1Yi0zYmIwLTRjYTEtYTYxNC04YmU2YThjNjY3MjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwaG90by9uZXdzIHBhcGVyIGhhcnNzbWVudC5wbmciLCJpYXQiOjE3NDg4NTg3OTAsImV4cCI6MTc4MDM5NDc5MH0.65HovewNuKNNXwKLi0hLJO2sbbFyKPHGCN-GoboaBD8"
  }
];

export function Media() {
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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-16">
            <Newspaper className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">メディア掲載</h2>
          </motion.div>

          <div className="space-y-8">
            {mediaAppearances.map((media, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-card p-6 rounded-lg shadow-sm border group hover:shadow-md transition-all duration-300"
              >
                <Link href={media.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="flex gap-6 items-start">
                    {media.image && (
                      <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={media.image}
                          alt={media.outlet}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <time className="text-sm text-muted-foreground block mb-2">
                            {media.date}
                          </time>
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                            {media.outlet}
                          </h3>
                          <p className="text-muted-foreground">
                            {media.description}
                          </p>
                        </div>
                        <div className="bg-primary/10 p-2 rounded-full text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}