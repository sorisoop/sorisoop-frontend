import { useState } from "react";
import { GalleryDialogContext } from "@/features/gallery/contexts/";

interface GalleryDialogProviderProps {
  children: React.ReactNode;
}

export function GalleryDialogProvider({ children }: GalleryDialogProviderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isPaused = !!selectedImage;

  return (
    <GalleryDialogContext.Provider value={{ selectedImage, setSelectedImage, isPaused }}>
      {children}
    </GalleryDialogContext.Provider>
  );
}
