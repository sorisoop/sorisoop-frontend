import { createContext } from "react";

export type RecordingSessionContextValue = {
  finalBlob: Blob | null;
  finalUrl: string | null;
  setFinalBlob: (blob: Blob | null) => void;
};

export const RecordingSessionContext = createContext<RecordingSessionContextValue | undefined>(undefined);
