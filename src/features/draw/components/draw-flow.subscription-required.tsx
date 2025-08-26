import { useDrawFlow } from "../hooks";

export function DrawFlowSubscriptionRequired({ children }: { children: React.ReactNode }) {
  const { step } = useDrawFlow();
  return step === "subscription-required" ? <>{children}</> : null;
}
