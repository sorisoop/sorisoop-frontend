import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ParentsLayout } from "@/shared/layouts/parents";
import { Button } from "@/shared/components/ui/button";
import { useProfiles } from "@/entities/profile/api/hooks";
import type { ProfileResponse } from "@/entities/profile/model";
import { ChildMissionCard } from "@/features/parents/child";

export default function ParentsPage() {
  const navigate = useNavigate();
  const { data: profiles } = useProfiles();
  const children = profiles?.filter((p) => p.role === "CHILD") ?? [];

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
            {children.map((child: ProfileResponse) => (
              <ChildMissionCard key={child.id} child={child} />
            ))}
          </div>
        </div>
      </div>
    </ParentsLayout>
  );
}
