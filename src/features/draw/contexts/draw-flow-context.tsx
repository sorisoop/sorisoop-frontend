import type { CustomFairyTaleConceptResponse } from "@/entities/fairy-tale/model";
import { createContext } from "react";

export type Step = "draw" | "loading" | "result" | "complete" | "error" | "subscription-required";

interface DrawFlowContextValue {
  step: Step;
  previousStep: Step | null;
  direction: "forward" | "backward";
  result: CustomFairyTaleConceptResponse | null;
  setStep: (step: Step) => void;
  setResult: (result: CustomFairyTaleConceptResponse | null) => void;
}

export const DrawFlowContext = createContext<DrawFlowContextValue | null>(null);
