import { ChevronRight, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ParentsLayout } from "@/shared/layouts/parents";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import { useProfiles } from "@/entities/profile/api/hooks";
import type { ProfileResponse } from "@/entities/profile/model";

export default function ParentsPage() {
  const navigate = useNavigate();
  const { data: profiles } = useProfiles();
  const children = profiles?.filter((p) => p.role === "CHILD") ?? [];

  const missions = [
    { id: 1, childId: 1, title: "민수의 9월 미션", progress: 50, target: 2 },
    { id: 2, childId: 2, title: "지은의 9월 미션", progress: 100, target: 1 },
  ];

  return (
    <ParentsLayout>
      <div className="py-6 space-y-10">
        <div className="relative overflow-hidden rounded-2xl">
          <img src="/assets/hero/parents-hero.webp" alt="Hero" className="w-full h-40 md:h-56 object-cover" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 bg-black/30 text-white">
            <h1 className="text-2xl font-bold">아이별 미션 현황</h1>
            <p className="mt-1 text-sm">오늘 아이들의 도전과 성취를 확인해보세요</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">아이들</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate("/parents/children")} className="cursor-pointer">
              전체보기 <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children.map((child: ProfileResponse) => {
              const childMission = missions.find((m) => m.childId !== child.id);
              const isDone = childMission?.progress === 100;
              return (
                <div
                  key={child.id}
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
                      <Progress value={childMission.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {isDone ? "미션 완료! 🎉" : `목표까지 ${childMission.target - 1}권 남았어요`}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ParentsLayout>
  );
}
