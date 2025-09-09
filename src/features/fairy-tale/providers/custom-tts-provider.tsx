import { useCallback, useEffect, useRef, useState } from "react";
import { CustomTtsContext } from "@/features/fairy-tale/contexts";
import { base64ToAudioUrl } from "@/shared/utils/voice";
import type { TtsResponse } from "@/entities/voice/model";

export function CustomTtsProvider({ ttsData, children }: { ttsData: TtsResponse; children: React.ReactNode }) {
  const totalPages = ttsData.results.length ?? 0;

  const [bookEnded, setBookEnded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  useEffect(() => {
    const currentResult = ttsData.results[currentPage];
    if (!currentResult?.audio_base64) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    const url = base64ToAudioUrl(currentResult.audio_base64);
    const audio = new Audio(url);
    audioRef.current = audio;

    audio.onloadedmetadata = () => setDuration(audio.duration);
    audio.ontimeupdate = () => setCurrentTime(audio.currentTime);

    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentPage((prev) => {
        if (prev < totalPages - 1) {
          return prev + 1;
        } else {
          setBookEnded(true);
          return prev;
        }
      });
    };

    if (autoPlayEnabled) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [ttsData, currentPage, totalPages, autoPlayEnabled]);

  const play = useCallback(() => {
    audioRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  return (
    <CustomTtsContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        ttsData,
        isPlaying,
        currentTime,
        duration,
        play,
        pause,
        seek,
        autoPlayEnabled,
        setAutoPlayEnabled,
        bookEnded,
        setBookEnded,
      }}
    >
      {children}
    </CustomTtsContext.Provider>
  );
}
