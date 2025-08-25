import { useDrawFlow } from "../hooks";

export function DrawFlowDraw({ children }: { children: React.ReactNode }) {
  const { step } = useDrawFlow();
  return step === "draw" ? <>{children}</> : null;
}
