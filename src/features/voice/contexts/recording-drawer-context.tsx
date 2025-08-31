import { createContext } from "react";
import type { Phase } from "../types";

export type RecordingDrawerContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  isDesktop: boolean;

  phase: Phase;
  setPhase: (p: Phase) => void;

  tempBlob: Blob | null;
  tempUrl: string | null;
  setTempBlob: (b: Blob | null) => void;

  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  resetRecording: () => void;
  completeRecording: () => void;

  isPlaying: boolean;
  togglePlay: () => void;
};

export const RecordingDrawerContext = createContext<RecordingDrawerContextValue | null>(null);
