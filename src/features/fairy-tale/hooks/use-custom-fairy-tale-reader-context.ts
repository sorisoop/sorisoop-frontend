import { useContext } from "react";
import { CustomFairyTaleReaderContext } from "../contexts";

export const useCustomFairyTaleReaderContext = () => {
  const context = useContext(CustomFairyTaleReaderContext);
  if (!context) throw new Error("useFairyTaleReaderContext must be used within a FairyTaleReaderProvider");
  return context;
};
