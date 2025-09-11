import { useContext } from "react";
import { GalleryDialogContext } from "@/features/gallery/contexts/";

export const useGalleryDialog = () => {
  const context = useContext(GalleryDialogContext);
  if (!context) throw new Error("useGalleryDialog must be used within a GalleryDialogProvider");
  return context;
};
