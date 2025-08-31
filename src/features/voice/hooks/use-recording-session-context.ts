import { useContext } from "react";
import { RecordingSessionContext } from "../contexts";

export const useRecordingSessionContext = () => {
  const context = useContext(RecordingSessionContext);
  if (!context) {
    throw new Error("useRecordingSessionContext must be used within <RecordingDrawerProvider>");
  }
  return context;
};
