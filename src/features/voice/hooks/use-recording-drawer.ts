import { useContext } from "react";
import { RecordingDrawerContext } from "../contexts/recording-drawer-context";

export const useRecordingDrawer = () => {
  const context = useContext(RecordingDrawerContext);
  if (!context) {
    throw new Error("useRecordingDrawer must be used within <RecordingDrawerProvider>");
  }
  return context;
};
