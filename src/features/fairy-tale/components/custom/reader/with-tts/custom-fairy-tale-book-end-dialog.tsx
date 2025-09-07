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
import { useCustomFairyTaleReaderContext } from "@/features/fairy-tale/hooks";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const messages = ["끝까지 읽었어요!", "훌륭해요  마지막 장까지 완주했네요!", "대단해요  책 한 권을 다 읽었어요!"];

export function CustomFairyTaleBookEndDialog() {
  const randomMessage = useMemo(() => messages[Math.floor(Math.random() * messages.length)], []);
  const isDesktop = useIsDeskTop();
  const { isBookEndOpen, setIsBookEndOpen, goToPage } = useCustomFairyTaleReaderContext();
  const navigate = useNavigate();

  const handleGoBack = () => {
    setIsBookEndOpen(false);
    navigate(-1);
  };

  const handleReplay = () => {
    goToPage(0);
    setIsBookEndOpen(false);
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
            <Button variant="outline" onClick={handleReplay} className="cursor-pointer">
              다시보기
            </Button>
            <Button onClick={handleGoBack} className="cursor-pointer bg-primary text-secondary font-semibold">
              돌아가기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isBookEndOpen} onOpenChange={setIsBookEndOpen}>
      <DrawerContent
        ref={(el) => {
          if (el) {
            requestAnimationFrame(() => {
              const focusable = el.querySelector<HTMLElement>("button, [tabindex]:not([tabindex='-1'])");
              focusable?.focus();
            });
          }
        }}
      >
        <DrawerHeader>
          <DrawerTitle className="text-left text-lg font-bold animate-pulse">{randomMessage}</DrawerTitle>
          <DrawerDescription className="text-sm text-muted-foreground text-left">
            이 동화책은 여기서 끝났습니다.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-4 flex flex-col gap-2">
          <Button onClick={handleReplay} className="w-full bg-primary text-white font-semibold">
            다시보가
          </Button>
          <DrawerClose asChild>
            <Button type="button" variant="outline" className="w-full cursor-pointer" onClick={handleGoBack}>
              돌아가기
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
