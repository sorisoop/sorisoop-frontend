import { useState } from "react";
import { useGivenMissions } from "@/entities/mission/api/hooks";
import type { GetGivenMissionResponse } from "@/entities/mission/models";
import { Progress } from "@/shared/components/ui/progress";
import { MissionStatusBadge } from "@/features/parents/components";

export default function ChildrenMissionList({
  childId,
  children,
}: {
  childId: number;
  children?: (missionId: number | null, open: boolean, setOpen: (o: boolean) => void) => React.ReactNode;
}) {
  const { data: missions } = useGivenMissions(childId);
  const [selectedMissionId, setSelectedMissionId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  if (missions.length === 0) {
    return (
      <div className="flex h-[calc(100vh-124px)] flex-col items-center justify-center gap-6 text-center px-6">
        <p className="text-base text-muted-foreground">아직 등록된 미션이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 py-4">
        {missions.map((mission: GetGivenMissionResponse) => (
          <div
            key={mission.missionId}
            className="p-4 rounded-xl border bg-card hover:shadow transition space-y-3 cursor-pointer"
            onClick={() => {
              setSelectedMissionId(mission.missionId);
              setOpen(true);
            }}
          >
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm md:text-base">{mission.title}</p>
              <MissionStatusBadge status={mission.missionStatus} />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="px-2 py-1 rounded-full bg-primary/90 text-secondary">시작일 {mission.startDate}</span>
              <span className="px-2 py-1 rounded-full bg-destructive/90 text-secondary">마감일 {mission.endDate}</span>
            </div>

            <Progress value={mission.progressRate} className="h-2" />
          </div>
        ))}
      </div>

      {children?.(selectedMissionId, open, setOpen)}
    </>
  );
}
