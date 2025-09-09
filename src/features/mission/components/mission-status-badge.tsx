import { Badge } from "@/shared/components/ui/badge";
import type { MissionStatus } from "@/entities/mission/models";

export default function MissionStatusBadge({ status }: { status: MissionStatus }) {
  switch (status) {
    case "NOT_STARTED":
      return <Badge variant="secondary">시작 전</Badge>;
    case "ONGOING":
      return (
        <Badge variant="default" className="text-secondary">
          진행 중
        </Badge>
      );
    case "COMPLETED":
      return <Badge className="bg-green-500 text-white hover:bg-green-600">완료</Badge>;
    case "FAILED":
      return <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/90">실패</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
