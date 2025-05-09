"use client";

import { motion } from "framer-motion";
import { Clock, Briefcase, GraduationCap } from "lucide-react";

const services = [
  {
    title: "ライトプラン",
    duration: "60分",
    price: "未定～",
    features: [
      "ハラスメントの基礎知識",
      "グループワーク",
      "質疑応答セッション"
    ],
    icon: Clock,
    color: "bg-brand-pink",
    gradient: "bg-gradient-to-br from-brand-pink/10 to-white",
    shadow: "shadow-[0_10px_30px_rgba(255,191,199,0.15)]",
    borderColor: "border-brand-pink/20"
  },
  {
    title: "スタンダードプラン",
    duration: "120分",
    price: "未定～",
    features: [
      "ハラスメントの詳細な理解",
      "ケーススタディ分析",
      "グループディスカッション",
      "アクションプラン作成"
    ],
    icon: Briefcase,
    color: "bg-brand-blue",
    gradient: "bg-gradient-to-br from-brand-blue/10 to-white",
    shadow: "shadow-[0_10px_30px_rgba(181,220,255,0.15)]",
    borderColor: "border-brand-blue/20"
  },
  {
    title: "キャリア講演会",
    duration: "要相談",
    price: "未定～",
    features: [
      "経験者の体験談",
      "予防と対策の実践的アドバイス",
      "質疑応答セッション",
      "フォローアップ資料",
      "内容のカスタマイズ可能"
    ],
    icon: GraduationCap,
    color: "bg-brand-yellow",
    gradient: "bg-gradient-to-br from-brand-yellow/10 to-white",
    shadow: "shadow-[0_10px_30px_rgba(255,215,0,0.15)]",
    borderColor: "border-brand-yellow/20"
  }
];

export function Services() {
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
      <div className="gradient-bg opacity-5"></div>
      <div className="texture-overlay"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl"></div>
      
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
            className="text-3xl md:text-4xl font-bold text-center mb-8 relative inline-block mx-auto"
          >
            <span className="bg-gradient-to-r from-brand-pink via-brand-blue to-brand-yellow bg-clip-text text-transparent px-4">提供メニュー</span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
          >
            目的や規模に合わせて最適なプランをお選びいただけます
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className={`rounded-xl p-6 shadow-lg border backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col ${service.gradient} ${service.shadow} ${service.borderColor}`}
              >
                <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 relative`}>
                  <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse-soft"></div>
                  <service.icon className="w-8 h-8 text-white relative z-10" />
                </div>

                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.duration}</p>
                
                <div className="mb-6">
                  <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">¥{service.price}</span>
                </div>

                <ul className="space-y-3 flex-grow">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <span className={`w-1.5 h-1.5 ${service.color} rounded-full mr-2`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.p 
            variants={itemVariants}
            className="text-sm text-muted-foreground text-center mt-12"
          >
            ※ 料金は税抜価格です。交通費は別途必要となります。
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}