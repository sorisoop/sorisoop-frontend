import { createContext } from "react";

export type RecordingDrawerContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  isDesktop: boolean;
  audioBlob: Blob | null;
  setAudioBlob: (blob: Blob | null) => void;
};

export const RecordingDrawerContext = createContext<RecordingDrawerContextValue | null>(null);
