import { useContext } from "react";
import { MissionFlowContext } from "@/features/parents/mission/contexts";

export function useMissionFlowContext() {
  const context = useContext(MissionFlowContext);
  if (!context) throw new Error("useMissionFlow must be used within MissionFlowProvider");
  return context;
}
