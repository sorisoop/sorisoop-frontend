import { createContext } from "react";

export interface GalleryDialogContextValue {
  selectedImage: string | null;
  setSelectedImage: (img: string | null) => void;
  isPaused: boolean;
}

export const GalleryDialogContext = createContext<GalleryDialogContextValue | null>(null);
