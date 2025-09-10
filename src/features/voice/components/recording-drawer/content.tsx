import { useEffect, useState } from "react";
import { toast } from "sonner";
import { X, Play, Pause, CheckCircle2, RotateCcw } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import { DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/shared/components/ui/drawer";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog";
import { useIsWebview } from "@/shared/hooks/use-is-webview";
import { cn } from "@/shared/lib/utils";
import { useRecordingDrawer } from "@/features/voice/hooks";
import type { VoiceFormValues } from "@/features/voice/types";

type ContentProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function RecordingDrawerContent({ className, children }: ContentProps) {
  const {
    isDesktop,
    setOpen,
    phase,
    startRecording,
    stopRecording,
    resetRecording,
    completeRecording,
    tempBlob,
    isPlaying,
    togglePlay,
  } = useRecordingDrawer();

  const { setValue } = useFormContext<VoiceFormValues>();
  const { isWebView } = useIsWebview();

  const [elapsedTime, setElapsedTime] = useState(0);
  const minDuration = 10;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleComplete = () => {
    if (!tempBlob) {
      toast.error(`목소리 파일이 저장되지 않았습니다.`, { position: "top-right" });
      return;
    }

    if (elapsedTime < minDuration) {
      toast.error(`최소 ${minDuration}초 이상 녹음해야 합니다.`, { position: "top-right" });
      return;
    }

    let file: File;

    if (isWebView) file = new File([tempBlob], "voice.wav", { type: "audio/wav" });
    else file = new File([tempBlob], "voice.webm", { type: "audio/webm" });

    setValue("voiceFile", file);
    completeRecording();
  };

  useEffect(() => {
    if (phase === "recording") {
      setElapsedTime(0);
      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const GuideBlock = (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-muted-foreground">녹음 문장</p>
      <blockquote className="text-lg leading-7 md:text-xl md:leading-8 font-semibold text-foreground">
        <span className="block">이게 뭐지? 작은 상자 안에는 반짝이는 돌이 들어 있었어요.</span>
        <span className="block">그 돌은 마치 별빛처럼 반짝였고, 내가 손에 쥐자 따뜻한 온기가 전해졌어요. </span>
        <span className="block">정말 신비롭다! 누가 여기다 두고 간 걸까?</span>
      </blockquote>
    </div>
  );

  const Instruction = {
    idle: (
      <p className="text-center text-sm text-muted-foreground leading-relaxed">조용한 곳에서 또박또박 읽어주세요.</p>
    ),
    recording: (
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground leading-relaxed">녹음 문장을 읽어주세요.</p>
        <p className="text-lg font-mono font-bold text-destructive">{formatTime(elapsedTime)}</p>
      </div>
    ),
    review: (
      <p className="text-center text-sm text-muted-foreground leading-relaxed">내가 방금 읽은 목소리를 들어보세요.</p>
    ),
  }[phase];

  const Controls = {
    idle: (
      <div className="grid place-items-center pt-4">
        <Button
          type="button"
          aria-label="녹음 시작"
          onClick={startRecording}
          className={cn(
            "relative grid place-items-center h-16 w-16 rounded-full cursor-pointer",
            "border-2 border-border bg-background hover:bg-accent hover:border-border",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40",
            "shadow-lg transition-all duration-200"
          )}
        >
          <span className="block h-6 w-6 rounded-full bg-destructive shadow-sm" />
        </Button>
      </div>
    ),
    recording: (
      <div className="grid place-items-center pt-4">
        <Button
          type="button"
          aria-label="녹음 정지"
          onClick={stopRecording}
          className={cn(
            "relative grid place-items-center h-16 w-16 rounded-full cursor-pointer",
            "border-2 border-border bg-background hover:bg-accent hover:border-border",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40",
            "shadow-lg transition-all duration-200"
          )}
        >
          <span className="block h-6 w-6 rounded bg-destructive shadow-sm" />
        </Button>
      </div>
    ),
    review: (
      <div className="pt-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <Button
              type="button"
              variant="ghost"
              onClick={resetRecording}
              className={cn(
                "h-16 w-16 rounded-full p-0 cursor-pointer",
                "border-2 border-border hover:border-border hover:bg-accent",
                "transition-all duration-200"
              )}
              aria-label="다시 녹음"
            >
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
            </Button>
            <span className="mt-3 text-xs text-muted-foreground">다시 녹음</span>
          </div>

          <div className="flex flex-col items-center">
            <Button
              type="button"
              onClick={togglePlay}
              className={cn(
                "h-16 w-16 rounded-full grid place-items-center cursor-pointer",
                "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40",
                "shadow-lg transition-all duration-200"
              )}
              aria-label={isPlaying ? "일시정지" : "재생"}
            >
              {isPlaying ? <Pause className="!h-8 !w-8 text-white" /> : <Play className="!h-8 !w-8 text-white" />}
            </Button>
          </div>

          <div className="flex flex-col items-center">
            <Button
              type="button"
              variant="ghost"
              onClick={handleComplete}
              className={cn(
                "h-16 w-16 rounded-full p-0 cursor-pointer",
                "border-2 border-border hover:border-border hover:bg-accent",
                "transition-all duration-200"
              )}
              aria-label="녹음 완료"
            >
              <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
            </Button>
            <span className="mt-3 text-xs text-muted-foreground">녹음 완료</span>
          </div>
        </div>
      </div>
    ),
  }[phase];

  /** body */
  const body = children ?? (
    <div className="relative">
      {!isDesktop && (
        <Button
          type="button"
          aria-label="닫기"
          onClick={() => setOpen(false)}
          className="absolute right-0 -top-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground bg-background hover:bg-accent cursor-pointer"
        >
          <X className="h-5 w-5" />
        </Button>
      )}
      <div className="mt-2 space-y-2">
        {GuideBlock}
        {Instruction}
        {Controls}
      </div>
    </div>
  );

  /** Desktop vs Mobile */
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
