import { useState } from "react";
import { DrawFlowContext, type Step } from "../contexts/draw-flow-context";
import type { CustomFairyTaleConceptResponse } from "@/entities/fairy-tale/model";

export function DrawFlowProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<Step>("draw");
  const [result, setResult] = useState<CustomFairyTaleConceptResponse | null>(null);

  return <DrawFlowContext.Provider value={{ step, result, setStep, setResult }}>{children}</DrawFlowContext.Provider>;
}
