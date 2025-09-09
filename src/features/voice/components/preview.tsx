import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

import { useRecordingSessionContext } from "@/features/voice/hooks";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

export default function Preview() {
  const { finalBlob, finalUrl } = useRecordingSessionContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  // 🔹 finalBlob 변화에 따라 초기화
  useEffect(() => {
    if (!finalBlob || finalBlob.size === 0) {
      stopAudio();
    }
  }, [finalBlob]);

  // 🔹 재생 끝나면 상태 리셋
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [finalUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      stopAudio();
    } else {
      audio.currentTime = 0;
      try {
        audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  if (!finalUrl) return null;

  return (
    <>
      <div className="grid sm:grid-cols-12 sm:items-center mt-6 gap-2">
        <div className="sm:col-span-4">
          <label className="text-base sm:text-lg font-semibold block">미리듣기</label>
          <p className="hidden sm:block text-sm text-muted-foreground">녹음된 음성을 확인해보세요.</p>
        </div>

        <div className="sm:col-span-8 flex sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={togglePlay}
            className={cn("w-full sm:w-auto flex items-center justify-center gap-2")}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? "정지" : "재생"}
          </Button>

          <audio
            ref={audioRef}
            src={finalUrl}
            preload="auto"
            playsInline
            webkit-playsinline="true"
            x-webkit-airplay="allow"
            controls={false}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className="my-4 border-0 sm:border-b border-border" />
    </>
  );
}
