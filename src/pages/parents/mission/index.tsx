import { MissionPageContent } from "@/features/parents/mission/components";
import { MissionFlowProvider } from "@/features/parents/mission/providers";

export default function MissionPage() {
  return (
    <MissionFlowProvider>
      <MissionPageContent />
    </MissionFlowProvider>
  );
}
