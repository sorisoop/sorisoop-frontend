import { useState, useCallback } from "react";
import { DrawFlowContext, type Step } from "../contexts/draw-flow-context";
import type { CustomFairyTaleConceptResponse } from "@/entities/fairy-tale/model";

export function DrawFlowProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<Step>("draw");
  const [stepHistory, setStepHistory] = useState<Step[]>(["draw"]);
  const [previousStep, setPreviousStep] = useState<Step | null>(null);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [result, setResult] = useState<CustomFairyTaleConceptResponse | null>(null);

  const goToStep = useCallback(
    (next: Step) => {
      if (isTransitioning || step === next) return;

      // 기본 direction 계산
      let newDirection: "forward" | "backward" = "forward";
      const existingIndex = stepHistory.indexOf(next);
      const currentIndex = stepHistory.indexOf(step);

      if (existingIndex !== -1 && existingIndex < currentIndex) {
        newDirection = "backward";
      }

      if (next === "error" || next === "subscription-required") {
        newDirection = "forward";
      }

      setIsTransitioning(true);
      setDirection(newDirection);
      setPreviousStep(step);

      requestAnimationFrame(() => {
        setStep(next);

        if (newDirection === "forward") {
          setStepHistory((prev) => [...prev, next]);
        }

        setTimeout(() => setIsTransitioning(false), 350);
      });
    },
    [step, stepHistory, isTransitioning]
  );

  const resetHistory = useCallback(() => {
    setStep("draw");
    setStepHistory(["draw"]);
    setPreviousStep(null);
  }, []);

  return (
    <DrawFlowContext.Provider
      value={{
        step,
        previousStep,
        direction,
        stepHistory,
        result,
        setResult,
        setStep: goToStep,
        resetHistory,
      }}
    >
      {children}
    </DrawFlowContext.Provider>
  );
}
