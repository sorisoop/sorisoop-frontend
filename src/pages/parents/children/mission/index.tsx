import { BackHeaderLayout } from "@/shared/layouts";
import { Progress } from "@/shared/components/ui/progress";
import { BookOpen, BookMarked, Pencil } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGivenMissions } from "@/entities/mission/api/hooks";
import type { MissionType, MissionStatus, GetGivenMissionResponse } from "@/entities/mission/models";

function getMissionIcon(type: MissionType) {
  switch (type) {
    case "READ_BOOK":
      return <BookOpen className="h-6 w-6 text-foreground" />;
    case "READ_CATEGORY":
      return <BookMarked className="h-6 w-6 text-foreground" />;
    case "CREATE_FAIRY_TALE":
      return <Pencil className="h-6 w-6 text-foreground" />;
    default:
      return <BookOpen className="h-6 w-6 text-foreground" />;
  }
}

function getMissionStatusInfo(status: MissionStatus, progressRate: number) {
  if (progressRate === 0) {
    return { label: "시작 전", className: "bg-gray-200 text-gray-700" };
  }
  if (progressRate === 100) {
    return { label: "완료", className: "bg-green-500 text-white" };
  }

  switch (status) {
    case "ONGOING":
      return { label: "진행 중", className: "bg-primary text-white" };
    case "FAILED":
      return { label: "실패", className: "bg-destructive text-white" };
    default:
      return { label: status, className: "bg-gray-200 text-gray-700" };
  }
}

export default function ChildrenMissionPage() {
  const { childId } = useParams<{ childId: string }>();
  const { data: missions, isLoading } = useGivenMissions(Number(childId));

  return (
    <BackHeaderLayout title="아이 미션">
      <div className="space-y-5 py-6">
        {isLoading && <p className="text-sm text-muted-foreground">불러오는 중...</p>}

        {missions?.map((mission: GetGivenMissionResponse) => {
          const isDone = mission.progressRate === 100;
          const { label, className } = getMissionStatusInfo(mission.missionStatus, mission.progressRate);

          return (
            <div
              key={mission.missionId}
              className="flex items-center gap-4 p-4 rounded-2xl border bg-card hover:shadow-md transition cursor-pointer"
            >
              {/* 왼쪽 아이콘 */}
              <div
                className={`flex items-center justify-center w-14 h-14 rounded-xl ${
                  isDone ? "bg-green-200" : "bg-blue-200"
                }`}
              >
                {getMissionIcon(mission.missionType)}
              </div>

              {/* 오른쪽 내용 */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-lg">{mission.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>{label}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary/90 text-secondary">{mission.startDate}</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/90 text-secondary">{mission.endDate}</span>
                </div>
                <Progress value={mission.progressRate} className="h-2" />
              </div>
            </div>
          );
        })}

        {missions?.length === 0 && !isLoading && (
          <p className="text-sm text-muted-foreground">아직 등록된 미션이 없습니다.</p>
        )}
      </div>
    </BackHeaderLayout>
  );
}
