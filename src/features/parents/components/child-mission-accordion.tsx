import { useState } from "react";
import { useGivenMissions } from "@/entities/mission/api/hooks";
import { useCompletionStatistics } from "@/entities/statistics/api/hooks";
import type { ProfileResponse } from "@/entities/profile/model";
import type { GetGivenMissionResponse } from "@/entities/mission/models";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/shared/components/ui/accordion";
import { Progress } from "@/shared/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { MissionStatusBadge } from "@/features/mission/components";

export default function ChildMissionAccordion({ child }: { child: ProfileResponse }) {
  const { data: missions } = useGivenMissions(child.id);

  const [duration, setDuration] = useState(30);
  const { data: completion } = useCompletionStatistics(child.id);

  const totalCount = completion?.[0]?.totalCount ?? 0;
  const readCount = completion?.[0]?.readCount ?? 0;
  const percent = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

  return (
    <div className="p-4 rounded-md bg-background border hover:shadow-md transition">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
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

        <Select value={String(duration)} onValueChange={(v) => setDuration(Number(v))}>
          <SelectTrigger className="w-24 h-8 text-xs">
            <SelectValue placeholder="기간 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">30일</SelectItem>
            <SelectItem value="90">90일</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <Progress value={percent} className="h-2" />
        <p className="text-xs text-muted-foreground mt-1 text-right">
          {readCount} / {totalCount} 권 ({percent}%)
        </p>
      </div>

      {(!missions || missions.length === 0) && (
        <p className="text-sm text-muted-foreground">아직 등록된 미션이 없습니다.</p>
      )}

      {missions && missions.length > 0 && (
        <Accordion type="single" collapsible className="w-full">
          {missions.map((mission: GetGivenMissionResponse) => (
            <AccordionItem key={mission.missionId} value={String(mission.missionId)}>
              <AccordionTrigger className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span>{mission.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-medium">
                  <MissionStatusBadge status={mission.missionStatus} />
                  <span className="px-2 py-0.5 rounded-full bg-primary/90 text-secondary">
                    시작일 {mission.startDate}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-destructive/90 text-secondary">
                    마감일 {mission.endDate}
                  </span>
                </div>
                <Progress value={mission.progressRate} className="h-2" />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
