import { useContext } from "react";
import { DrawFlowContext } from "../contexts";

export const useDrawFlow = () => {
  const context = useContext(DrawFlowContext);
  if (!context) throw new Error("useDrawFlow must be used inside DrawFlowProvider");
  return context;
};
