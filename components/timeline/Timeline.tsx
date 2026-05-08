"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

const timelineEvents = [
  {
    date: "2023年5月",
    title: "Üniring結成",
  },
  {
    date: "2024年3月25日",
    title: "TOKYO EDUCATION LAB主催「起業LAB」最終プレゼンテーション大会最優秀賞受賞",
    highlight: true,
    image: "/images/uniring/20240325-kigyo-lab-grandprix.jpg"
  },
  {
    date: "2025年1月20日",
    title: "【ワークショップ開催】駒場学園高校 起業LAB 4期",
    image: "/images/uniring/20250120-komaba-kigyo-lab4.jpg"
  },
  {
    date: "2025年2月14日",
    title: "「ハラスメントを楽しく学ぼう〜アカハラはイグハラ〜」「ハラスメントのメタ認知」マイプロジェクトアワード特別賞受賞",
    highlight: true,
    image: "/images/uniring/20250214-myproject-award.jpg"
  },
  {
    date: "2025年2月14日",
    title: "クラウドファンディング開始",
    image: "/images/uniring/20250214-crowdfunding-start.jpg"
  },
  {
    date: "2025年2月22日",
    title: "「ハラスメントのメタ認知」マイプロジェクトアワード地域summit advanced出場",
    image: "/images/uniring/20250222-myproject-summit.jpg"
  },
  {
    date: "2025年3月24日",
    title: "クラウドファンディング目標達成",
    image: "/images/uniring/20250324-crowdfunding-success.png"
  },
  {
    date: "2025年3月30日",
    title: "【ワークショップ開催】Tokyo Startup Gatewayプロジェクト・フェア出展",
    image: "/images/uniring/20250330-tsg-fair.jpg"
  },
  {
    date: "2025年4月20日",
    title: "朝日新聞社中高生新聞掲載",
    highlight: true,
    image: "/images/uniring/20250420-asahi-junior.jpg"
  },
  {
    date: "2025年4月29日",
    title: "朝日新聞掲載",
    highlight: true,
    image: "/images/uniring/20250429-asahi-shimbun.jpg"
  },
  {
    date: "2025年4月30日",
    title: "東京新聞掲載",
    highlight: true,
    image: "/images/uniring/20250430-tokyo-shimbun.jpg"
  },
  {
    date: "2025年6月28日",
    title: "株式会社iGO主催 EDUVISON 2025 登壇",
    image: "/images/uniring/20250628-eduvision2025.jpg"
  },
  {
    date: "2025年8月3日",
    title: "【ワークショップ開催】Tokyo Startup Gatewayプロジェクト・フェア出展",
    image: "/images/uniring/20250803-tsg-fair.jpg"
  },
  {
    date: "2025年9月8日",
    title: "【ワークショップ開催】駒場学園高校 起業LAB 5期",
    image: "/images/uniring/20250908-komaba-kigyo-lab5.jpg"
  },
  {
    date: "2025年11月30日",
    title: "【ワークショップ開催】Tokyo Startup Gatewayプロジェクト・フェア出展",
    image: "/images/uniring/20251130-tsg-fair.jpg"
  },
  {
    date: "2026年2月2日",
    title: "【ワークショップ開催】駒場学園高校ウェルビーイング委員会研修",
    image: "/images/uniring/20260202-wellbeing-training.jpg"
  },
  {
    date: "2026年3月15日",
    title: "【ワークショップ開催】プロジェクトフェア",
    image: "/images/uniring/20260315-project-fair.jpg"
  },
  {
    date: "2026年3月25日",
    title: "Üniring 2nd Anniversary party 開催",
    highlight: true,
    image: "/images/uniring/20260325-2nd-anniversary.jpg"
  },
];

const teamMembers = [
  {
    name: "寺井葉南",
    role: "共同代表",
    image: "/images/uniring/member-terai-hanan.jpg",
    qualifications: [
      "教育学部在学中",
      "教育カウンセラー資格取得",
    ],
    university: "東京学芸大学"
  },
  {
    name: "石橋舞優",
    role: "共同代表",
    image: "/images/uniring/member-ishibashi-mayu.jpeg",
    university: "東京大学"
  },
  {
    name: "大塚まさはる",
    role: "共同代表",
    image: "https://images.pexels.com/photos/1181694/pexels-photo-1181694.jpeg",
    university: "東京大学"
  }
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });
  const scrollWidth = useRef(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = containerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    scrollWidth.current = containerRef.current.scrollWidth - containerRef.current.clientWidth;
    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 0.2; // スクロール速度を10分の1に減速（ピクセル/ミリ秒）

    const animate = (currentTime: number) => {
      if (containerRef.current) {
        const deltaTime = currentTime - lastTime;
        let newPosition = scrollPosition + speed * deltaTime;

        // スクロール位置が最大値を超えたら先頭に戻る
        if (newPosition >= scrollWidth.current) {
          newPosition = 0;
          containerRef.current.scrollTo({
            left: 0,
          });
        } else {
          containerRef.current.scrollTo({
            left: newPosition,
          });
        }

        setScrollPosition(newPosition);
        lastTime = currentTime;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [scrollPosition]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            実績と代表紹介
          </h2>

          {/* Timeline Section */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm"
              onClick={() => handleScroll('left')}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm"
              onClick={() => handleScroll('right')}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div 
              ref={containerRef}
              className="overflow-x-scroll scrollbar-hide relative"
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}>
              <div className="min-w-max pb-8 px-12">
                <div className="flex gap-8 items-stretch">
                  {timelineEvents.map((event, index) => {
                    const isEven = index % 2 === 0;
                    return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: isEven ? -20 : 20, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: [0.23, 1, 0.32, 1]
                      }}
                      className={`w-80 flex flex-col group ${isEven ? 'mt-0' : 'mt-16'} relative`}
                    >
                      <div className="relative z-10">
                        <div className="w-full h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
                        <div 
                          className={`absolute top-0 left-0 w-4 h-4 rounded-full -translate-y-1.5 
                          ${event.highlight 
                            ? 'bg-primary shadow-lg shadow-primary/20 ring-4 ring-primary/30' 
                            : 'bg-primary/60'
                          }`} 
                        />
                      </div>
                      <div className="mt-6 bg-card p-6 rounded-lg shadow-sm border flex-1 flex flex-col transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                        {event.image && (
                          <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <time className="text-sm font-semibold text-primary mb-3 block">
                          {event.date}
                        </time>
                        <p className={`flex-1 flex items-center ${event.highlight ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                          {event.title}
                        </p>
                      </div>
                    </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            <motion.div 
              className="h-1 bg-primary mt-4 mx-auto"
              style={{ 
                scaleX: scrollXProgress,
                transformOrigin: "left"
              }}
            />
          </div>

          {/* Team Section */}
          <div className="mt-32">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-16">
              代表紹介
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-card p-6 rounded-lg shadow-sm border text-center relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover rounded-full ring-4 ring-primary/20"
                    />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{member.name}</h4>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <p className="text-muted-foreground">{member.university}</p>
                    </div>
                    {member.qualifications && (
                      <div className="flex flex-col items-center gap-1">
                        {member.qualifications.map((qual, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-primary" />
                            <p className="text-muted-foreground">{qual}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}