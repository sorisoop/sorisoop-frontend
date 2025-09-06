import { useContext } from "react";
import { FairyTaleReaderStandaloneContext } from "../contexts";

export const useFairyTaleReaderStandaloneContext = () => {
  const context = useContext(FairyTaleReaderStandaloneContext);
  if (!context) throw new Error("useFairyTaleReaderStandaloneContext must be used within a FairyTaleReaderProvider");
  return context;
};
