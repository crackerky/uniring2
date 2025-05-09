"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface IntroOverlayProps {
  onComplete?: () => void;
  autoSkipDelay?: number; // in milliseconds
}

// Safe localStorage wrapper to prevent errors
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn("Failed to access localStorage:", error);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn("Failed to write to localStorage:", error);
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn("Failed to remove from localStorage:", error);
    }
  }
};

export function IntroOverlay({ 
  onComplete, 
  autoSkipDelay = 15000 // Default to 15 seconds
}: IntroOverlayProps) {
  const [isVisible, setIsVisible] = useState<boolean | undefined>(undefined);
  const [activePhrase, setActivePhrase] = useState(0);
  const [phrasesCompleted, setPhrasesCompleted] = useState<boolean[]>([false, false, false]);
  const [canDismiss, setCanDismiss] = useState(false);
  const scrollRef = useRef(0);
  const touchStartRef = useRef(0);
  const pathname = usePathname();
  const scrollThreshold = 50; // REDUCED: Amount of scroll needed to trigger next phrase (was 120)
  const phraseDisplayTime = 1000; // REDUCED: Minimum time to display each phrase in milliseconds (was 1800)
  
  const phrases = [
    "押し潰された声",
    "流した涙",
    ["もう誰にも", "同じ痛みを感じさせない"] 
  ];

  // イントロの完了処理をメモ化
  const handleComplete = useCallback(() => {
    console.log("[IntroOverlay] handleComplete called, isVisible:", isVisible);
    if (isVisible !== true) return;
    
    // イントロを見たことを保存
    safeLocalStorage.setItem("hasSeenIntro", "true");
    console.log("[IntroOverlay] Intro marked as seen in localStorage");
    
    // スクロールを再度有効化
    document.body.style.overflow = '';
    console.log("[IntroOverlay] Body overflow reset");
    
    // コンポーネントの表示を終了
    setIsVisible(false);
    console.log("[IntroOverlay] isVisible set to false");
    
    // コールバックがあれば実行
    if (onComplete) {
      setTimeout(() => {
        onComplete();
        console.log("[IntroOverlay] onComplete callback executed");
      }, 1000); // アニメーション完了を待つ
    }
    
    // スクロール位置をリセット
    window.scrollTo(0, 0);
    console.log("[IntroOverlay] Window scrolled to top");
  }, [isVisible, onComplete]);

  // フレーズが完了した後の最小表示時間を確保
  useEffect(() => {
    if (isVisible !== true) return;
    
    const timer = setTimeout(() => {
      const newCompletedPhrases = [...phrasesCompleted];
      newCompletedPhrases[activePhrase] = true;
      setPhrasesCompleted(newCompletedPhrases);
      console.log(`[IntroOverlay] Phrase ${activePhrase} marked as completed`);
      
      // すべてのフレーズが表示され、最小表示時間が経過したかチェック
      if (activePhrase === phrases.length - 1 && !canDismiss) {
        console.log("[IntroOverlay] All phrases displayed, setting canDismiss to true");
        setCanDismiss(true);
      }
    }, phraseDisplayTime);
    
    return () => clearTimeout(timer);
  }, [activePhrase, phrasesCompleted, canDismiss, phrases.length, isVisible]);

  // 初期化処理
  useEffect(() => {
    if (typeof window === 'undefined') return;

    console.log("[IntroOverlay] Initializing, pathname:", pathname);

    // ホームページ以外では表示しない
    if (pathname !== "/") {
      console.log("[IntroOverlay] Not on homepage, setting isVisible to false");
      setIsVisible(false);
      return;
    }

    // Reset localStorage to make intro visible again
    safeLocalStorage.removeItem("hasSeenIntro");
    console.log("[IntroOverlay] Removed hasSeenIntro from localStorage");
    
    // Always show the intro
    setIsVisible(true);
    document.body.style.overflow = 'hidden';
    console.log("[IntroOverlay] Body overflow set to hidden");

    return () => {
      console.log("[IntroOverlay] Cleanup effect, resetting body overflow");
      document.body.style.overflow = '';
    };
  }, [pathname]);

  // 自動スキップ機能
  useEffect(() => {
    if (isVisible !== true) return;
    
    console.log(`[IntroOverlay] Auto-skip timer started, will trigger in ${autoSkipDelay}ms`);
    const timer = setTimeout(() => {
      console.log("[IntroOverlay] Auto-skip timer triggered");
      handleComplete();
    }, autoSkipDelay);
    
    return () => {
      console.log("[IntroOverlay] Auto-skip timer cleared");
      clearTimeout(timer);
    };
  }, [autoSkipDelay, isVisible, handleComplete]);

  // Manual advance function for debugging and improved interaction
  const advancePhrase = useCallback(() => {
    console.log(`[IntroOverlay] Attempting to advance from phrase ${activePhrase}`);
    
    if (activePhrase < phrases.length - 1 && phrasesCompleted[activePhrase]) {
      console.log(`[IntroOverlay] Moving to next phrase: ${activePhrase} -> ${activePhrase + 1}`);
      setActivePhrase(prev => prev + 1);
    } 
    else if (activePhrase === phrases.length - 1 && canDismiss) {
      console.log("[IntroOverlay] Last phrase shown and can dismiss, completing intro");
      handleComplete();
    } else {
      console.log("[IntroOverlay] Cannot advance yet. Phrase complete:", phrasesCompleted[activePhrase], "canDismiss:", canDismiss);
    }
  }, [activePhrase, phrasesCompleted, canDismiss, phrases.length, handleComplete]);

  // スクロールでフレーズを進める
  useEffect(() => {
    if (isVisible !== true) return;
    
    let lastScrollY = window.scrollY;
    let isProcessingScroll = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      
      console.log(`[IntroOverlay] Scroll detected, currentScroll: ${currentScrollY}, delta: ${scrollDelta}, threshold: ${scrollThreshold}`);
      
      // Only process scroll if we're not already processing one and delta is significant
      if (!isProcessingScroll && scrollDelta > scrollThreshold) {
        isProcessingScroll = true;
        console.log(`[IntroOverlay] Significant scroll detected: ${scrollDelta} > ${scrollThreshold}`);
        
        // Force window back to top to ensure consistent scroll behavior
        window.scrollTo(0, 0);
        
        // Try to advance to next phrase
        advancePhrase();
        
        // Reset processing state after a short delay
        setTimeout(() => {
          isProcessingScroll = false;
          lastScrollY = window.scrollY;
          console.log("[IntroOverlay] Scroll processing reset, ready for next scroll");
        }, 300);
      }
    };
    
    console.log("[IntroOverlay] Adding scroll event listener");
    window.addEventListener("scroll", handleScroll);
    
    // モバイル用のタッチイベント処理
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
      console.log(`[IntroOverlay] Touch start detected at Y: ${touchStartRef.current}`);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isProcessingScroll) return;
      
      const touchY = e.touches[0].clientY;
      const touchDiff = touchStartRef.current - touchY;
      console.log(`[IntroOverlay] Touch move detected, diff: ${touchDiff}, threshold: ${scrollThreshold}`);
      
      if (touchDiff > scrollThreshold) {
        isProcessingScroll = true;
        console.log(`[IntroOverlay] Significant touch movement detected: ${touchDiff} > ${scrollThreshold}`);
        
        // Try to advance to next phrase
        advancePhrase();
        
        // Reset touch position and processing state
        touchStartRef.current = touchY;
        setTimeout(() => {
          isProcessingScroll = false;
          console.log("[IntroOverlay] Touch processing debounce completed");
        }, 300);
      }
    };
    
    console.log("[IntroOverlay] Adding touch event listeners");
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    
    // キーボードナビゲーションの処理
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(`[IntroOverlay] Key press detected: ${e.key}`);
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        console.log(`[IntroOverlay] Navigation key detected: ${e.key}`);
        advancePhrase();
      }
    };
    
    console.log("[IntroOverlay] Adding keyboard event listener");
    window.addEventListener("keydown", handleKeyDown);
    
    // Click handler for advancing phrases
    const handleClick = () => {
      console.log("[IntroOverlay] Click detected");
      advancePhrase();
    };
    
    console.log("[IntroOverlay] Adding click event listener");
    document.addEventListener("click", handleClick);
    
    return () => {
      console.log("[IntroOverlay] Removing all event listeners");
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, [isVisible, advancePhrase]);

  // テキストアニメーション
  const sentenceVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  const containerVariants = {
    visible: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // デバッグ用 - イントロ状態をリセットするボタン
  const resetIntroState = () => {
    console.log("[IntroOverlay] Resetting intro state");
    safeLocalStorage.setItem("hasSeenIntro", "false");
    // オプション: ページをリロードしてイントロをすぐに表示
    window.location.reload();
  };

  // Debug function to force advance to next phrase
  const debugForceAdvance = () => {
    const newCompletedPhrases = [...phrasesCompleted];
    newCompletedPhrases[activePhrase] = true;
    setPhrasesCompleted(newCompletedPhrases);
    
    if (activePhrase < phrases.length - 1) {
      setActivePhrase(prev => prev + 1);
    } else if (!canDismiss) {
      setCanDismiss(true);
    } else {
      handleComplete();
    }
  };

  console.log("[IntroOverlay] Render state:", { 
    isVisible, 
    activePhrase, 
    canDismiss, 
    phrasesCompleted 
  });

  return (
    <AnimatePresence>
      {isVisible === true && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          animate="visible"
          exit="exit"
          variants={containerVariants}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999, // Extremely high z-index to ensure it's above everything
          }}
        >
          <div 
            className="absolute inset-0" 
            style={{ 
              position: 'fixed',
              height: '100vh',
              width: '100vw',
              overflow: 'hidden',
              touchAction: 'none'
            }}
          />
          
          <div className="w-full h-full flex flex-col items-center justify-center relative px-4">
            {phrases.map((phrase, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activePhrase === index ? 1 : (activePhrase > index ? 0.3 : 0) 
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                style={{
                  height: "100vh", // Ensure full viewport height
                  padding: index === 2 ? "0" : "0" // No padding to ensure visibility
                }}
              >
                <motion.div
                  className="w-full max-w-7xl mx-auto"
                  variants={sentenceVariants}
                  initial="hidden"
                  animate={activePhrase === index ? "visible" : "hidden"}
                >
                  <div className="flex justify-center">
                    {index === 2 ? (
                      // Special layout for the final phrase - centered in viewport
                      <div className="w-full text-center px-4 h-full flex flex-col items-center justify-center">
                        {/* First line */}
                        <motion.div
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-10"
                          variants={sentenceVariants}
                        >
                          {Array.isArray(phrase) && (
                            phrase[0].split("").map((char, charIndex) => (
                              <motion.span
                                key={`first-${charIndex}`}
                                variants={letterVariants}
                                className="inline-block"
                              >
                                {char === " " ? <span>&nbsp;</span> : char}
                              </motion.span>
                            ))
                          )}
                        </motion.div>
                        
                        {/* Second line */}
                        <motion.div
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                          variants={sentenceVariants}
                        >
                          {Array.isArray(phrase) && (
                            phrase[1].split("").map((char, charIndex) => (
                              <motion.span
                                key={`second-${charIndex}`}
                                variants={letterVariants}
                                className="inline-block"
                              >
                                {char === " " ? <span>&nbsp;</span> : char}
                              </motion.span>
                            ))
                          )}
                        </motion.div>
                      </div>
                    ) : (
                      // Style for other shorter phrases
                      typeof phrase === "string" && phrase.split("").map((char, charIndex) => (
                        <motion.span
                          key={`${index}-${charIndex}`}
                          variants={letterVariants}
                          className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-white inline-block"
                          style={{ 
                            textShadow: "0 0 30px rgba(255,255,255,0.5)"
                          }}
                        >
                          {char === " " ? <span>&nbsp;</span> : char}
                        </motion.span>
                      ))
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
            
            <motion.p 
              className="absolute bottom-8 sm:bottom-16 w-full text-center text-gray-400 text-sm sm:text-base md:text-lg"
              initial={{ opacity: 0.7 }}
              animate={{ 
                opacity: activePhrase < phrases.length - 1 ? 0.7 : 
                  (canDismiss ? 0.9 : 0.3)
              }}
              transition={{ duration: 0.5 }}
            >
              {activePhrase < phrases.length - 1 ? 
                "下にスクロールまたはタップして続ける" : 
                (canDismiss ? 
                  "下にスクロールまたはタップしてメインページへ" : 
                  "しばらくお待ちください...")
              }
            </motion.p>
            
            {/* Debug panel */}
            <div className="fixed top-0 left-0 bg-black/80 text-white p-2 text-xs z-[10000]" style={{ display: process.env.NODE_ENV === 'development' ? 'flex' : 'none', flexDirection: 'column', gap: '4px' }}>
              <div>Active: {activePhrase} / {phrases.length-1}</div>
              <div>Completed: {phrasesCompleted.map(c => c ? '✓' : '✗').join(' ')}</div>
              <div>Can Dismiss: {canDismiss ? 'Yes' : 'No'}</div>
              <button 
                onClick={debugForceAdvance}
                className="bg-white text-black px-2 py-1 rounded mt-1"
              >
                Force Next
              </button>
            </div>
            
            {/* Reset buttons for testing */}
            <button
              onClick={resetIntroState}
              className="fixed top-4 right-4 bg-white text-black px-3 py-1 rounded text-sm z-50 opacity-20 hover:opacity-100 transition-opacity mr-4"
              style={{ display: process.env.NODE_ENV === 'development' ? 'block' : 'block' }}
            >
              Reset Intro
            </button>
            <button
              onClick={() => alert(`hasSeenIntro: ${safeLocalStorage.getItem("hasSeenIntro")}`)}
              className="fixed top-4 right-24 bg-white text-black px-3 py-1 rounded text-sm z-50 opacity-20 hover:opacity-100 transition-opacity"
              style={{ display: process.env.NODE_ENV === 'development' ? 'block' : 'block' }}
            >
              Check Storage
            </button>
            <button
              onClick={() => {
                setIsVisible(prev => !prev);
                console.log("[IntroOverlay] Manually toggled isVisible to:", !isVisible);
              }}
              className="fixed top-16 right-4 bg-white text-black px-3 py-1 rounded text-sm z-50 opacity-20 hover:opacity-100 transition-opacity"
              style={{ display: process.env.NODE_ENV === 'development' ? 'block' : 'block' }}
            >
              Toggle Visibility
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}