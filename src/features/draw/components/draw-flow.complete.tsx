import { useDrawFlow } from "../hooks";

export function DrawFlowComplete({ children }: { children: React.ReactNode }) {
  const { step } = useDrawFlow();
  return step === "complete" ? <>{children}</> : null;
}
