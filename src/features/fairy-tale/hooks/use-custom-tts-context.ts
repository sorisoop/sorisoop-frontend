import { useContext } from "react";
import { CustomTtsContext } from "@/features/fairy-tale/contexts";

export const useCustomTtsContext = () => {
  const ctx = useContext(CustomTtsContext);
  if (!ctx) throw new Error("useCustomTtsContext must be used within TtsProvider");
  return ctx;
};
