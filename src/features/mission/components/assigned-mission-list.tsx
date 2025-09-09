import { useState } from "react";
import { useAssignedMissions } from "@/entities/mission/api/hooks";
import type { AssignedMissionResponse } from "@/entities/mission/models";
import { Progress } from "@/shared/components/ui/progress";
import { MissionStatusBadge } from "@/features/mission/components";

export default function AssignedMissionList({
  children,
}: {
  children: (missionId: number | null, open: boolean, setOpen: (o: boolean) => void) => React.ReactNode;
}) {
  const { data: missions } = useAssignedMissions();
  const [selectedMissionId, setSelectedMissionId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-4 py-4">
        {missions.map((mission: AssignedMissionResponse) => (
          <div
            key={mission.missionId}
            className="p-4 rounded-xl border bg-card hover:shadow-md transition space-y-3 cursor-pointer"
            onClick={() => {
              setSelectedMissionId(mission.missionId);
              setOpen(true);
            }}
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm md:text-base text-foreground">{mission.title}</p>
              <MissionStatusBadge status={mission.missionStatus} />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="px-2 py-1 rounded-full bg-primary/90 text-secondary">시작일 {mission.startDate}</span>
              <span className="px-2 py-1 rounded-full bg-destructive/90 text-secondary">마감일 {mission.endDate}</span>
            </div>

            <div className="space-y-1">
              <Progress value={mission.progressRate} className="h-2" />
              <p className="text-[11px] text-muted-foreground">진행률 {mission.progressRate}%</p>
            </div>
          </div>
        ))}
      </div>

      {children(selectedMissionId, open, setOpen)}
    </>
  );
}
