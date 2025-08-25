import { useDrawFlow } from "../hooks";

export function DrawFlowLoading({ children }: { children: React.ReactNode }) {
  const { step } = useDrawFlow();
  return step === "loading" ? <>{children}</> : null;
}
