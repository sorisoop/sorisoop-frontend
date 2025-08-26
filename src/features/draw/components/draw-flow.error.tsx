import { useDrawFlow } from "../hooks";

export function DrawFlowError({ children }: { children: React.ReactNode }) {
  const { step } = useDrawFlow();
  return step === "error" ? <>{children}</> : null;
}
