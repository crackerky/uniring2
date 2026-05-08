"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Expand, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Photo {
  id: string;
  url: string;
  title: string;
  date: Date;
  category: string;
}

const categories = ["イベント", "ワークショップ", "メディア掲載", "メンバー", "その他"];

export default function PhotosPage() {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/photos');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch photos');
        }

        if (data.photos) {
          const transformedPhotos: Photo[] = data.photos.map((photo: any) => ({
            id: photo.id,
            url: photo.url,
            title: photo.title,
            date: new Date(photo.date),
            category: photo.category,
          }));
          setPhotos(transformedPhotos);
        }
      } catch (error) {
        console.error("写真の取得中にエラーが発生しました:", error);
        toast({
          variant: "destructive",
          title: "エラー",
          description: "写真の読み込みに失敗しました。",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [toast]);

  const filteredPhotos = currentCategory
    ? photos.filter(p => p.category === currentCategory)
    : photos;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
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
            className="text-3xl md:text-4xl font-bold text-center mb-6"
          >
            写真ギャラリー
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground text-center mb-12"
          >
            活動の様子や実績を写真でご覧いただけます
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-8 flex flex-wrap gap-2 justify-center"
          >
            <Button
              type="button"
              variant={currentCategory === null ? "default" : "outline"}
              onClick={() => setCurrentCategory(null)}
              className="mb-2"
            >
              すべて
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                type="button"
                variant={currentCategory === category ? "default" : "outline"}
                onClick={() => setCurrentCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {isLoading && photos.length === 0 ? (
            <motion.div variants={itemVariants} className="text-center py-12">
              <p className="text-muted-foreground">読み込み中...</p>
            </motion.div>
          ) : filteredPhotos.length > 0 ? (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-card rounded-lg overflow-hidden shadow-sm border relative group cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="relative aspect-square bg-muted/30">
                    <Image
                      src={photo.url}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                      loading="lazy"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Expand className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium truncate">{photo.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {photo.category} - {photo.date.toLocaleDateString("ja-JP")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center py-12 text-muted-foreground"
            >
              <ImagePlus className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>該当する写真がありません</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <Dialog
        open={!!selectedPhoto}
        onOpenChange={(open) => {
          if (!open) setSelectedPhoto(null);
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <div className="p-6 pb-0">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl font-bold pr-8 leading-snug">
                {selectedPhoto?.title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {selectedPhoto?.category} ・ {selectedPhoto?.date.toLocaleDateString("ja-JP")}
              </p>
            </DialogHeader>
          </div>
          {selectedPhoto && (
            <div className="flex justify-center bg-muted/30 mx-6 mb-6 rounded-lg overflow-hidden">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                width={1600}
                height={1200}
                className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
                unoptimized
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
