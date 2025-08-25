import type { CustomFairyTaleConceptResponse } from "@/entities/fairy-tale/model";
import { createContext } from "react";

export type Step = "draw" | "loading" | "result";

interface DrawFlowContextValue {
  step: Step;
  result: CustomFairyTaleConceptResponse | null;
  setStep: (s: Step) => void;
  setResult: (r: CustomFairyTaleConceptResponse | null) => void;
}

export const DrawFlowContext = createContext<DrawFlowContextValue | null>(null);
