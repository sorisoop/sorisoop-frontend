import { useEffect, useRef, useState } from "react";

import { Play, Pause } from "lucide-react";

import { useRecordingDrawer } from "@/features/voice/hooks";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

export default function Preview() {
  const { audioBlob, open: isDrawerOpen } = useRecordingDrawer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!audioBlob || audioBlob.size === 0) {
      setAudioUrl(null);
      return;
    }

    const url = URL.createObjectURL(audioBlob);
    setAudioUrl(url);
    stopAudio();

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [audioBlob]);

  useEffect(() => {
    if (isDrawerOpen) stopAudio();
  }, [isDrawerOpen]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      stopAudio();
    } else {
      audio.currentTime = 0;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  if (!audioUrl) return null;

  return (
    <>
      <div className="grid sm:grid-cols-12 sm:items-center mt-6 gap-2">
        <div className="sm:col-span-4">
          <label className="text-base sm:text-lg font-semibold block">미리듣기</label>
          <p className="hidden sm:block text-sm text-muted-foreground">녹음된 음성을 확인해보세요.</p>
        </div>

        <div className="sm:col-span-8 flex sm:justify-end">
          <Button
            variant="outline"
            onClick={togglePlay}
            className={cn("w-full sm:w-auto flex items-center justify-center gap-2")}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? "정지" : "재생"}
          </Button>
          <audio ref={audioRef} src={audioUrl} preload="auto" hidden />
        </div>
      </div>

      <div className="my-4 border-0 sm:border-b border-border" />
    </>
  );
}
