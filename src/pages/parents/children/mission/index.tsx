import { BackHeaderLayout } from "@/shared/layouts";
import { Progress } from "@/shared/components/ui/progress";
import { BookOpen } from "lucide-react";

const mockMissions = [
  {
    missionId: "1",
    title: "9월 독서 미션",
    childName: "민수",
    missionType: "READING",
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    missionStatus: "IN_PROGRESS",
    progressRate: 50,
  },
  {
    missionId: "2",
    title: "공주 동화 3권 읽기",
    childName: "지은",
    missionType: "READING",
    startDate: "2025-09-01",
    endDate: "2025-09-15",
    missionStatus: "COMPLETED",
    progressRate: 100,
  },
  {
    missionId: "3",
    title: "10월 독서 챌린지",
    childName: "민수",
    missionType: "READING",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
    missionStatus: "NOT_STARTED",
    progressRate: 0,
  },
];

export default function ChildrenMissionPage() {
  //   const { childId } = useParams<{ childId: string }>();

  return (
    <BackHeaderLayout title="아이 미션">
      <div className="space-y-5 py-6 px-4">
        {mockMissions.map((mission) => {
          const isDone = mission.progressRate === 100;
          const statusLabel = mission.progressRate === 0 ? "대기" : isDone ? "완료" : "진행 중";

          const statusColor =
            mission.progressRate === 0
              ? "bg-gray-100 text-gray-600"
              : isDone
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700";

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
                <BookOpen className="h-6 w-6 text-foreground" />
              </div>

              {/* 오른쪽 내용 */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-lg">{mission.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>{statusLabel}</span>
                </div>

                <p className="text-sm text-muted-foreground mb-2">
                  {mission.childName} • {mission.startDate} ~ {mission.endDate}
                </p>

                <Progress value={mission.progressRate} className="h-2" />
              </div>
            </div>
          );
        })}
      </div>
    </BackHeaderLayout>
  );
}
