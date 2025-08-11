import { useEffect, useRef, useState } from "react";
import { X, Play, Pause, CheckCircle2, RotateCcw } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/shared/components/ui/drawer";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";

import { useAudioRecorder, useMicrophonePermission, useRecordingDrawer } from "@/features/voice/hooks";

type Phase = "idle" | "recording" | "review";
type ContentProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function RecordingDrawerContent({ className, children }: ContentProps) {
  const { open, isDesktop, setOpen, setAudioBlob } = useRecordingDrawer();

  const { status, requestPermission } = useMicrophonePermission();
  const { audioBlob, audioObjectUrl, startRecording, stopRecording, resetRecording } = useAudioRecorder();

  const [phase, setPhase] = useState<Phase>("idle");
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const element = audioRef.current;
    if (!element) return;

    const onEnded = () => setPlaying(false);
    element.addEventListener("ended", onEnded);
    return () => element.removeEventListener("ended", onEnded);
  }, [audioObjectUrl]);

  useEffect(() => {
    if (!open) {
      audioRef.current?.pause();
      setPlaying(false);
      resetRecording();
      setPhase("idle");
    }
  }, [open, resetRecording]);

  const handleStart = async () => {
    if (status !== "granted") {
      const granted = await requestPermission();
      if (granted !== "granted") return;
    }
    await startRecording({
      getMediaStream: () => navigator.mediaDevices.getUserMedia({ audio: true }),
    });
    setPhase("recording");
  };

  const handleStop = async () => {
    await stopRecording();
    setPhase("review");
  };

  const handleReset = () => {
    audioRef.current?.pause();
    setPlaying(false);
    resetRecording();
    setPhase("idle");
  };

  const handlePlayToggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const handleComplete = () => {
    if (!audioBlob || !audioObjectUrl) {
      console.log("[record] audioBlob 또는 audioObjectUrl 없음");
      return;
    }

    setAudioBlob(audioBlob);
    setOpen(false);
  };

  const GuideBlock = (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-muted-foreground">녹음 문장</p>
      <blockquote className="text-lg leading-7 md:text-xl md:leading-8 font-semibold text-foreground">
        <span className="block">"이게 뭐지?</span>
        <span className="block">작은 상자 안엔 반짝이는 돌이 들어 있었어요.</span>
        <span className="block">누가 여기다 두고 간 걸까?"</span>
      </blockquote>
    </div>
  );

  const Instruction = {
    idle: (
      <p className="text-center text-sm text-muted-foreground leading-relaxed">조용한 곳에서 또박또박 읽어주세요.</p>
    ),
    recording: <p className="text-center text-sm text-muted-foreground leading-relaxed">녹음 문장을 읽어주세요.</p>,
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
          onClick={handleStart}
          className={cn(
            "relative grid place-items-center h-16 w-16 rounded-full cursor-pointer",
            "border-2 border-border bg-background hover:bg-accent hover:border-border",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40",
            "shadow-lg transition-all duration-200"
          )}
        >
          <span className="block h-6 w-6 rounded-full bg-destructive shadow-sm" />
        </Button>
        <div className="mt-3 h-5 leading-5" />
      </div>
    ),
    recording: (
      <div className="grid place-items-center pt-4">
        <Button
          type="button"
          aria-label="녹음 정지"
          onClick={handleStop}
          className={cn(
            "relative grid place-items-center h-16 w-16 rounded-full cursor-pointer",
            "border-2 border-border bg-background hover:bg-accent hover:border-border",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40",
            "shadow-lg transition-all duration-200"
          )}
        >
          <span className="block h-6 w-6 rounded bg-destructive shadow-sm" />
        </Button>
        <div className="mt-3 h-5 leading-5"></div>
      </div>
    ),
    review: (
      <div className="pt-4">
        <div className="grid grid-cols-3 items- gap-4">
          <div className="flex flex-col items-center">
            <Button
              type="button"
              variant="ghost"
              onClick={handleReset}
              className={cn(
                "h-16 w-16 rounded-full p-0 cursor-pointer",
                "border-2 border-border hover:border-border hover:bg-accent",
                "transition-all duration-200"
              )}
              aria-label="다시 녹음"
            >
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
            </Button>
            <span className="mt-3 text-xs text-muted-foreground h-5 leading-5">다시 녹음</span>
          </div>

          <div className="flex flex-col items-center">
            <Button
              type="button"
              onClick={handlePlayToggle}
              className={cn(
                "h-16 w-16 rounded-full grid place-items-center cursor-pointer",
                "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40",
                "shadow-lg transition-all duration-200"
              )}
              aria-label={playing ? "일시정지" : "재생"}
            >
              {playing ? <Pause className="!h-8 !w-8 text-white" /> : <Play className="!h-8 !w-8 text-white" />}
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
            <span className="mt-3 text-xs text-muted-foreground h-5 leading-5">녹음 완료</span>
          </div>
        </div>

        <audio ref={audioRef} src={audioObjectUrl ?? undefined} preload="metadata" className="hidden" />
      </div>
    ),
  }[phase];

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
