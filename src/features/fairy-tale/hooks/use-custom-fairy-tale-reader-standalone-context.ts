import { useContext } from "react";
import { CustomFairyTaleReaderStandaloneContext } from "../contexts";

export const useCustomFairyTaleReaderStandaloneContext = () => {
  const context = useContext(CustomFairyTaleReaderStandaloneContext);
  if (!context)
    throw new Error("useCustomFairyTaleReaderStandaloneContext must be used within a FairyTaleReaderProvider");
  return context;
};
