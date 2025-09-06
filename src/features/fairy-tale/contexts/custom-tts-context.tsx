import type { TtsResponse } from "@/entities/voice/model";
import { createContext, type Dispatch, type SetStateAction } from "react";

export interface CustomTtsContextValue {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  ttsData?: TtsResponse;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  autoPlayEnabled: boolean;
  setAutoPlayEnabled: Dispatch<SetStateAction<boolean>>;
  bookEnded: boolean;
  setBookEnded: Dispatch<SetStateAction<boolean>>;
}

export const CustomTtsContext = createContext<CustomTtsContextValue | null>(null);
