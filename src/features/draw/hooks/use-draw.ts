import { useContext } from "react";
import { DrawContext } from "../contexts";

export const useDraw = () => {
  const context = useContext(DrawContext);
  if (!context) throw new Error("useDraw must be used inside DrawProvider");
  return context;
};
