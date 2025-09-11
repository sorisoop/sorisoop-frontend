import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/shared/components/ui/dialog";
import { useGalleryDialog } from "@/features/gallery/hooks";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function GalleryDialog() {
  const { selectedImage, setSelectedImage } = useGalleryDialog();

  return (
    <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
      <DialogOverlay className="fixed inset-0 bg-black/60" />
      <DialogContent
        className="fixed inset-0 !m-0 !max-w-none !rounded-none !translate-x-0 !translate-y-0 
             flex items-center justify-center bg-black/60 p-0
             [&>button]:absolute [&>button]:top-4 [&>button]:right-4 
             [&>button]:text-white [&>button:hover]:text-gray-300"
      >
        <DialogTitle className="sr-only">갤러리 이미지 미리보기</DialogTitle>
        <DialogDescription className="sr-only">선택한 이미지를 전체 화면으로 확인할 수 있습니다.</DialogDescription>
        {selectedImage && <img src={selectedImage} alt="갤러리 이미지" className="w-full h-full object-contain" />}{" "}
      </DialogContent>
    </Dialog>
  );
}
