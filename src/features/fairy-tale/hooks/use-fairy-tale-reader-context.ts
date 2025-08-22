import { useContext } from "react";
import { FairyTaleReaderContext } from "../contexts";

export const useFairyTaleReaderContext = () => {
  const context = useContext(FairyTaleReaderContext);
  if (!context) throw new Error("useFairyTaleReaderContext must be used within a FairyTaleReaderProvider");
  return context;
};
