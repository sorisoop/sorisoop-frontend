import { useContext } from "react";
import { TtsContext } from "@/features/fairy-tale/contexts";

export const useTtsContext = () => {
  const ctx = useContext(TtsContext);
  if (!ctx) throw new Error("useTtsContext must be used within TtsProvider");
  return ctx;
};
