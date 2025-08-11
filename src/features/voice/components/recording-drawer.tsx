"use client";

import { cloneElement, isValidElement } from "react";
import type { ReactElement } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { RecordingDrawerProvider } from "@/features/voice/providers";
import { useRecordingDrawer } from "@/features/voice/hooks";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";

type RootProps = {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  children: React.ReactNode;
};

function RecordingDrawerRoot({ open, onOpenChange, children }: RootProps) {
  return (
    <RecordingDrawerProvider open={open} onOpenChange={onOpenChange}>
      <Shell>{children}</Shell>
    </RecordingDrawerProvider>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const { open, setOpen, isDesktop } = useRecordingDrawer();
  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      {children}
    </Drawer>
  );
}

type TriggerProps = {
  children?: ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
};

function RecordingDrawerTrigger({ children }: TriggerProps) {
  const { setOpen } = useRecordingDrawer();
  if (!children || !isValidElement(children)) {
    return null;
  }

  const prev = children.props.onClick;
  return cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      prev?.(e);
      (e.currentTarget as HTMLElement).blur();
      setOpen(true);
    },
  });
}

type ContentProps = { className?: string; children?: React.ReactNode };

function RecordingDrawerContent({ className, children }: ContentProps) {
  const { isDesktop, setOpen } = useRecordingDrawer();

  const DefaultBody = (
    <div className="relative">
      {!isDesktop && (
        <Button
          type="button"
          aria-label="닫기"
          onClick={() => setOpen(false)}
          className="absolute right-0 -top-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground bg-background hover:bg-muted/60 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </Button>
      )}

      <div className="mt-2 space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground">녹음 문장</p>
          <blockquote className="text-lg leading-7 md:text-xl md:leading-8 font-semibold">
            <span className="block">“이게 뭐지?</span>
            <span className="block">작은 상자 안엔 반짝이는 돌이 들어 있었어요.</span>
            <span className="block">누가 여기다 두고 간 걸까?”</span>
          </blockquote>
        </div>

        <p className="text-center text-xs md:text-sm text-muted-foreground">
          조용한 곳에서 또박또박 읽어주세요.
          <br className="hidden md:block" />
          반드시 가이드 문장과 동일하게 녹음해야해요.
        </p>

        <div className="grid place-items-center pt-1 pb-2">
          <Button
            type="button"
            aria-label="녹음 시작"
            className={cn(
              "grid place-items-center h-20 w-20 md:h-24 md:w-24 rounded-full cursor-pointer",
              "border border-border shadow-sm !bg-background"
            )}
          >
            <span className="block h-5 w-5 md:h-6 md:w-6 rounded-full bg-orange-500" />
          </Button>
        </div>
      </div>
    </div>
  );

  const body = children ?? DefaultBody;

  return isDesktop ? (
    <DialogContent className={cn("sm:max-w-md rounded-2xl p-6", className)}>
      <DialogHeader className="hidden">
        <DialogTitle className="sr-only">녹음하기</DialogTitle>
        <DialogDescription className="sr-only">안내된 문장을 읽어 녹음해주세요</DialogDescription>
      </DialogHeader>
      {body}
    </DialogContent>
  ) : (
    <DrawerContent className={cn("rounded-t-2xl px-5 pb-6 pt-4", className)}>
      <DrawerHeader className="hidden">
        <DrawerTitle className="sr-only">녹음하기</DrawerTitle>
        <DrawerDescription className="sr-only">안내된 문장을 읽어 녹음해주세요</DrawerDescription>
      </DrawerHeader>
      {body}
    </DrawerContent>
  );
}

const RecordingDrawer = Object.assign(RecordingDrawerRoot, {
  Trigger: RecordingDrawerTrigger,
  Content: RecordingDrawerContent,
});
export default RecordingDrawer;
