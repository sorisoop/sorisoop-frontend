import { useState } from "react";
import { Calendar, Clock, TrendingUp } from "lucide-react";
import Lottie from "react-lottie-player";
import { useAssignedMissions } from "@/entities/mission/api/hooks";
import type { AssignedMissionResponse } from "@/entities/mission/models";
import { Progress } from "@/shared/components/ui/progress";
import { MissionStatusBadge } from "@/features/mission/components";
import { cn } from "@/shared/lib/utils";
import paintBrush from "@/lotties/paint-brush.json";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";

export default function AssignedMissionList({
  children,
}: {
  children: (missionId: number | null, open: boolean, setOpen: (o: boolean) => void) => React.ReactNode;
}) {
  const { data: missions } = useAssignedMissions();
  const [selectedMissionId, setSelectedMissionId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  if (missions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-213px)] text-center">
        <Lottie animationData={paintBrush} play loop className="w-32 h-32 mb-4" />
        <h2 className="text-lg font-bold">아직 받은 미션이 없어요!</h2>
        <p className="text-muted-foreground mt-1">조금만 기다리면 새로운 미션이 생길 거예요</p>
        <Button asChild size="sm" className="mt-4 text-secondary font-semibold w-xs max-w-xs h-10">
          <Link to="/fairy-tale/category/0">책 읽으러 가기</Link>
        </Button>
      </div>
    );
  }

  const getDaysRemaining = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      <div className="w-full py-6 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {missions?.map((mission: AssignedMissionResponse) => {
          const daysRemaining = getDaysRemaining(mission.endDate);
          const isUrgent = daysRemaining <= 3 && mission.missionStatus !== "COMPLETED";

          return (
            <div
              key={mission.missionId}
              className={cn(
                "group relative p-6 rounded-xl border bg-card hover:shadow-md transition-all cursor-pointer",
                isUrgent ? "border-destructive/40" : "border-border"
              )}
              onClick={() => {
                setSelectedMissionId(mission.missionId);
                setOpen(true);
              }}
            >
              <div className="absolute -top-2 -right-2">
                <MissionStatusBadge status={mission.missionStatus} />
              </div>

              <div className="mb-4 flex items-start gap-2">
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  {mission.title}
                </h3>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">시작일</span>
                  <span className="font-medium">{mission.startDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">마감일</span>
                  <span className={cn("font-medium", isUrgent ? "text-destructive" : "text-foreground")}>
                    {mission.endDate}
                  </span>
                  {daysRemaining > 0 && mission.missionStatus !== "COMPLETED" && (
                    <span
                      className={cn(
                        "ml-2 text-xs px-2 py-0.5 rounded-full",
                        isUrgent ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                      )}
                    >
                      D-{daysRemaining}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    <span>진행률</span>
                  </div>
                  <span className="font-semibold text-primary">{mission.progressRate}%</span>
                </div>
                <Progress value={mission.progressRate} className="h-2" />
              </div>
            </div>
          );
        })}
      </div>

      {children(selectedMissionId, open, setOpen)}
    </>
  );
}
