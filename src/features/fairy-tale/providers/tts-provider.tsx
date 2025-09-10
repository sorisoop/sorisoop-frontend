import { TtsContext } from "@/features/fairy-tale/contexts";
import { base64ToAudioUrl } from "@/shared/utils/voice";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTts } from "@/entities/voice/api/hooks";
import { useFairyTaleContents } from "@/entities/fairy-tale/api/hooks";

interface TtsProviderProps {
  speakerId: string;
  fairyTaleId: number;
  children: React.ReactNode;
}

export function TtsProvider({ speakerId, fairyTaleId, children }: TtsProviderProps) {
  const { data: contents } = useFairyTaleContents(fairyTaleId);
  const totalPages = contents.length ?? 0;

  const [currentPage, setCurrentPage] = useState(0);

  const page = useMemo(() => currentPage, [currentPage]);

  const { data: ttsData } = useTts(speakerId, fairyTaleId, page, "toast", {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [bookEnded, setBookEnded] = useState(false);

  useEffect(() => {
    if (!ttsData?.audio_base64) return;

    const url = base64ToAudioUrl(ttsData.audio_base64);
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = url;

    const handleLoaded = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentPage((prev) => {
        if (prev < totalPages - 1) return prev + 1;
        setBookEnded(true);
        return prev;
      });
    };
    const handleError = () => {
      console.error("Audio error:", audio.error);
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    if (autoPlayEnabled) {
      audio.play().catch((err) => {
        console.error("Auto play failed:", err);
        setIsPlaying(false);
      });
    }

    return () => {
      audio.removeAttribute("src");
      setTimeout(() => audio.load(), 50);
      audio.pause();
      URL.revokeObjectURL(url);

      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [ttsData, page, totalPages, autoPlayEnabled]);

  const play = useCallback(() => {
    if (audioRef.current?.src) {
      audioRef.current.play().catch((err) => console.error("Play failed:", err));
    }
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
    <TtsContext.Provider
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
      <audio
        ref={audioRef}
        preload="auto"
        playsInline
        controls={false}
        style={{ width: 0, height: 0, visibility: "hidden" }}
      />
      {children}
    </TtsContext.Provider>
  );
}
