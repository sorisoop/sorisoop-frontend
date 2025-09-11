import { X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTitle } from "@/shared/components/ui/dialog";
import { useGalleryDialog } from "@/features/gallery/hooks";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function GalleryDialog() {
  const { selectedImage, setSelectedImage } = useGalleryDialog();

  return (
    <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
      <DialogOverlay className="fixed inset-0 bg-black/60" />
      <DialogContent
        className="fixed inset-0 !m-0 !max-w-none !rounded-none !translate-x-0 !translate-y-0 
                   flex items-center justify-center bg-black/60 p-0"
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
            className="custom-close absolute top-2 right-2 text-white hover:text-gray-300 
                       p-2 rounded-full bg-black/40 hover:bg-black/60
                       transition focus:outline-none"
          >
            <X className="h-8 w-8 text-secondary" />
            <span className="sr-only">닫기</span>
          </button>
        </DialogClose>

        {selectedImage && <img src={selectedImage} alt="갤러리 이미지" className="w-full h-full object-contain" />}
      </DialogContent>
    </Dialog>
  );
}
