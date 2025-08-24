import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
  DrawerDescription,
} from "@/shared/components/ui/drawer";
import { useIsDeskTop } from "@/shared/hooks";
import { useFairyTaleReaderContext } from "@/features/fairy-tale/hooks";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

export function FairyTaleBookEndDialog() {
  const isDesktop = useIsDeskTop();
  const { isBookEndOpen, setIsBookEndOpen } = useFairyTaleReaderContext();
  const navigate = useNavigate();

  const messages = ["끝까지 읽었어요!", "훌륭해요  마지막 장까지 완주했네요!", "대단해요  책 한 권을 다 읽었어요!"];
  const randomMessage = useMemo(() => messages[Math.floor(Math.random() * messages.length)], []);

  const goHome = () => {
    setIsBookEndOpen(false);
    navigate("/");
  };

  if (isDesktop) {
    return (
      <Dialog open={isBookEndOpen} onOpenChange={setIsBookEndOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-left text-xl font-bold animate-bounce">{randomMessage}</DialogTitle>
            <DialogDescription className="text-left text-muted-foreground">
              이 동화책은 여기서 끝났습니다.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-2 mt-6 justify-end">
            <Button variant="outline" onClick={() => setIsBookEndOpen(false)} className="cursor-pointer">
              다시보기
            </Button>
            <Button onClick={goHome} className="cursor-pointer bg-primary text-white font-semibold">
              돌아가기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isBookEndOpen} onOpenChange={setIsBookEndOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-left text-lg font-bold animate-pulse">{randomMessage}</DrawerTitle>
        </DrawerHeader>

        <DrawerDescription className="px-4 text-sm text-muted-foreground">
          이 동화책은 여기서 끝났습니다.
        </DrawerDescription>

        <DrawerFooter className="pt-4 flex flex-col gap-2">
          <Button onClick={goHome} className="w-full bg-primary text-white font-semibold">
            홈으로
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full cursor-pointer">
              돌아가기
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
