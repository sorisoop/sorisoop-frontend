import { createContext } from "react";

export type RecordingDrawerContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  isDesktop: boolean;
};

export const RecordingDrawerContext = createContext<RecordingDrawerContextValue | null>(null);
