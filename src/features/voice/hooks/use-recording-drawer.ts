import { useContext } from "react";
import { RecordingDrawerContext } from "../contexts/recording-drawer-context";

export const useRecordingDrawer = () => {
  const ctx = useContext(RecordingDrawerContext);
  if (!ctx) {
    throw new Error("useRecordingDrawer must be used within <RecordingDrawerProvider>");
  }
  return ctx;
};
