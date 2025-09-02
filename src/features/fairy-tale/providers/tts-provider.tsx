import { useFairyTaleContents } from "@/entities/fairy-tale/api/hooks";
import { useTts } from "@/entities/voice/api/hooks";
import { TtsContext } from "@/features/fairy-tale/contexts";
import { base64ToAudioUrl } from "@/shared/utils/voice";
import { useCallback, useEffect, useRef, useState } from "react";

export function TtsProvider({ id, voiceUuid, children }: { id: number; voiceUuid: string; children: React.ReactNode }) {
  const { data: pages } = useFairyTaleContents(id);
  const totalPages = pages?.length ?? 0;

  const [currentPage, setCurrentPage] = useState(0);
  const { data: ttsData } = useTts(voiceUuid, id, currentPage + 1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!ttsData?.audio) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    const url = base64ToAudioUrl(ttsData.audio);
    const audio = new Audio(url);
    audioRef.current = audio;

    audio.onloadedmetadata = () => setDuration(audio.duration);
    audio.ontimeupdate = () => setCurrentTime(audio.currentTime);

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
    };

    audio.play().catch(() => setIsPlaying(false));
  }, [ttsData, totalPages]);

  const play = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.play();
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
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
      }}
    >
      {children}
    </TtsContext.Provider>
  );
}
