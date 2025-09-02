import type { TtsResponse } from "@/entities/voice/model";
import { createContext, type Dispatch, type SetStateAction } from "react";

export interface TtsContextValue {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  ttsData?: TtsResponse;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
}

export const TtsContext = createContext<TtsContextValue | null>(null);
