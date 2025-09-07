import { useNavigate } from "react-router-dom";
import { Trophy } from "lucide-react";
import { Progress } from "@/shared/components/ui/progress";
import { useGivenMissions } from "@/entities/mission/api/hooks";
import type { ProfileResponse } from "@/entities/profile/model";

type ChildMissionCardProps = {
  child: ProfileResponse;
};

export default function ChildMissionCard({ child }: ChildMissionCardProps) {
  const navigate = useNavigate();
  console.log(child);
  const { data: missions } = useGivenMissions(child.id);
  const childMission = missions?.[0];
  const isDone = childMission?.progressRate === 100;

  return (
    <div
      role="link"
      className="p-4 rounded-md bg-background border hover:shadow-md transition cursor-pointer"
      onClick={() => navigate(`/parents/children/${child.id}`)}
    >
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

      {childMission && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium">{childMission.title}</p>
            {isDone && <Trophy className="h-4 w-4 text-primary" />}
          </div>
          <Progress value={childMission.progressRate} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {isDone ? "미션 완료! 🎉" : `진행률 ${childMission.progressRate}%`}
          </p>
        </div>
      )}
    </div>
  );
}
