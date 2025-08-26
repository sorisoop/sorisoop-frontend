import { useState } from "react";
import { DrawFlowContext, type Step } from "../contexts/draw-flow-context";
import type { CustomFairyTaleConceptResponse } from "@/entities/fairy-tale/model";

const stepOrder: Step[] = ["draw", "loading", "result", "complete", "error"];

export function DrawFlowProvider({ children }: { children: React.ReactNode }) {
  const [step, setStepState] = useState<Step>("draw");
  const [previousStep, setPreviousStep] = useState<Step | null>(null);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [result, setResult] = useState<CustomFairyTaleConceptResponse | null>(null);

  const setStep = (next: Step) => {
    setPreviousStep(step);

    const currentIndex = stepOrder.indexOf(step);
    const nextIndex = stepOrder.indexOf(next);

    setDirection(nextIndex > currentIndex ? "forward" : "backward");
    setStepState(next);
  };

  return (
    <DrawFlowContext.Provider value={{ step, previousStep, direction, result, setStep, setResult }}>
      {children}
    </DrawFlowContext.Provider>
  );
}
