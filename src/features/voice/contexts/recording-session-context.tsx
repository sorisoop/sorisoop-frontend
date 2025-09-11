import { createContext } from "react";

export type RecordingSessionContextValue = {
  finalBlob: Blob | null;
  finalUrl: string | null;
  setFinalBlob: (blob: Blob | null) => void;

  stopPlayback: (() => void) | null;
  setStopPlayback: (fn: (() => void) | null) => void;
};

export const RecordingSessionContext = createContext<RecordingSessionContextValue | undefined>(undefined);
