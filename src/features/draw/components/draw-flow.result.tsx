import { useDrawFlow } from "../hooks";

export function DrawFlowResult({ children }: { children: React.ReactNode }) {
  const { step } = useDrawFlow();
  return step === "result" ? <>{children}</> : null;
}
