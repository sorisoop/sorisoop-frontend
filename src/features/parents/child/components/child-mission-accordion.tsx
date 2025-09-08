import { Trophy } from "lucide-react";
import { useGivenMissions } from "@/entities/mission/api/hooks";
import { Progress } from "@/shared/components/ui/progress";
import type { ProfileResponse } from "@/entities/profile/model";
import type { GetGivenMissionResponse, MissionStatus } from "@/entities/mission/models";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/shared/components/ui/accordion";
import { Badge } from "@/shared/components/ui/badge";

function getMissionStatusBadge(status: MissionStatus) {
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

export default function ChildMissionAccordion({ child }: { child: ProfileResponse }) {
  const { data: missions } = useGivenMissions(child.id);

  if (!missions || missions.length === 0) {
    return (
      <div className="p-4 rounded-md bg-background border hover:shadow-md transition">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={child.profileImage || "/default.webp"}
            alt={child.nickname}
            className="w-16 h-16 rounded-full border object-cover"
          />
          <div>
            <p className="font-semibold text-lg">
              {child.nickname} ({child.age}세)
            </p>
            <p className="text-sm text-muted-foreground">{child.gender === "M" ? "남자" : "여자"}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">아직 등록된 미션이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-md bg-background border hover:shadow-md transition">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={child.profileImage || "/default.webp"}
          alt={child.nickname}
          className="w-16 h-16 rounded-full border object-cover"
        />
        <div>
          <p className="font-semibold text-lg">
            {child.nickname} ({child.age}세)
          </p>
          <p className="text-sm text-muted-foreground">{child.gender === "M" ? "남자" : "여자"}</p>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {missions.map((mission: GetGivenMissionResponse) => {
          const isDone = mission.progressRate === 100;

          return (
            <AccordionItem key={mission.missionId} value={String(mission.missionId)}>
              <AccordionTrigger className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span>{mission.title}</span>
                  {isDone && <Trophy className="h-4 w-4 text-primary" />}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-medium">
                  {getMissionStatusBadge(mission.missionStatus)}

                  <span className="px-2 py-0.5 rounded-full bg-primary text-secondary">시작일 {mission.startDate}</span>
                  <span className="px-2 py-0.5 rounded-full bg-destructive text-secondary">
                    마감일 {mission.endDate}
                  </span>
                </div>

                <Progress value={mission.progressRate} className="h-2" />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
