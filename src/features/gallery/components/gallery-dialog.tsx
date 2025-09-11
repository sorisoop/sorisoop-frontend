import { X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTitle } from "@/shared/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useGalleryDialog } from "@/features/gallery/hooks";
import { PixelRippleArt, SheepEffect, TypographyEffect } from "@/features/gallery/components";

export default function GalleryDialog() {
  const { selectedImage, setSelectedImage } = useGalleryDialog();

  const renderContent = () => {
    switch (selectedImage) {
      case "/assets/gallery/ant.webp":
        return <PixelRippleArt />;
      case "/assets/gallery/sheep-background.webp":
        return <SheepEffect />;
      case "/assets/gallery/typograph-background.webp":
        return <TypographyEffect />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
      <DialogOverlay className="fixed inset-0 !bg-black/70 !m-0 !p-0" />
      <DialogContent
        className="
    fixed inset-0 
    !m-0 !p-0 
    !w-full !h-full 
    !max-w-none !rounded-none 
    !border-0 !shadow-none 
    !translate-x-0 !translate-y-0
    bg-black
    flex items-center justify-center
  "
      >
        <DialogTitle className="sr-only">갤러리 이미지 미리보기</DialogTitle>
        <DialogDescription className="sr-only">선택한 이미지를 전체 화면으로 확인할 수 있습니다.</DialogDescription>

        <style>{`
          [data-slot="dialog-close"]:not(.custom-close) {
            display: none !important;
          }
        `}</style>

        <DialogClose asChild>
          <button
            type="button"
            className="
              custom-close absolute top-2 right-2 
              p-2 rounded-full 
              bg-black/40 hover:bg-black/60 
              text-white hover:text-gray-300 
              transition focus:outline-none z-50
            "
          >
            <X className="h-8 w-8 text-secondary" />
            <span className="sr-only">닫기</span>
          </button>
        </DialogClose>

        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
