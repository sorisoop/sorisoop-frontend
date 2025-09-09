import { TtsContext } from "@/features/fairy-tale/contexts";
import { base64ToAudioUrl } from "@/shared/utils/voice";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const { data: ttsData } = useTts(speakerId, fairyTaleId, currentPage);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [bookEnded, setBookEnded] = useState(false);

  useEffect(() => {
    if (!ttsData?.audio_base64) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    const url = base64ToAudioUrl(ttsData.audio_base64);
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
  }, [ttsData, currentPage, autoPlayEnabled, totalPages]);

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
      {children}
    </TtsContext.Provider>
  );
}
