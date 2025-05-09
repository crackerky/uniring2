import './globals.css';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Inter, Noto_Serif_JP } from 'next/font/google';
import { Header } from '@/components/header/Header';

// Font configuration
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSerifJP = Noto_Serif_JP({ 
  weight: ['200', '300', '400', '500', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-serif-jp',
});

export const metadata: Metadata = {
  title: 'Üniring - 被害者も加害者もつくらない社会へ',
  description: '高校生発、ハラスメント未然防止教育プログラム。ハラスメントの未然防止を目指し、教育プログラムを提供しています。',
  keywords: 'ハラスメント,未然防止,教育プログラム,高校生,パワハラ,スクールハラスメント,ワークショップ',
  authors: [{ name: 'Üniring' }],
  openGraph: {
    title: 'Üniring - 被害者も加害者もつくらない社会へ',
    description: '高校生発、ハラスメント未然防止教育プログラム。ハラスメントの未然防止を目指し、教育プログラムを提供しています。',
    url: 'https://uniring.jp',
    siteName: 'Üniring',
    images: [
      {
        url: 'https://uniring.jp/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Üniring - ハラスメント未然防止教育プログラム',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Üniring - 被害者も加害者もつくらない社会へ',
    description: '高校生発、ハラスメント未然防止教育プログラム。ハラスメントの未然防止を目指し、教育プログラムを提供しています。',
    images: ['https://uniring.jp/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSerifJP.variable}`}>
      <head>
        <link rel="canonical" href="https://uniring.jp" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#FFBFC7" />
      </head>
      <body className="min-h-screen font-serif antialiased">
        <div className="fixed inset-0 z-[-3] bg-pattern"></div>
        
        {/* 浮遊する背景要素 - より大きく、より自然な動き */}
        <div className="animated-bg-element w-[400px] h-[400px] bg-brand-pink top-1/4 left-1/6 animate-float opacity-10"></div>
        <div className="animated-bg-element w-[500px] h-[500px] bg-brand-blue top-2/4 right-1/4 animate-float animation-delay-1000 opacity-10"></div>
        <div className="animated-bg-element w-[350px] h-[350px] bg-brand-yellow bottom-1/4 right-1/6 animate-float animation-delay-2000 opacity-10"></div>
        
        {/* 新しい浮遊要素 - より微妙な動き */}
        <div className="floating-orb w-[200px] h-[200px] bg-purple-accent top-[30%] right-[15%] animate-subtle-pulse"></div>
        <div className="floating-orb w-[250px] h-[250px] bg-teal-accent bottom-[20%] left-[10%] animate-subtle-pulse animation-delay-2000"></div>
        
        <Header />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}