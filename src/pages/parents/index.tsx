import { Suspense } from "react";
import { ParentsLayout } from "@/shared/layouts/parents";
import { ChildrenMissionSection, ChildrenMissionSectionSkeleton } from "@/features/parents/components";

export default function ParentsPage() {
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
        <Suspense fallback={<ChildrenMissionSectionSkeleton />}>
          <ChildrenMissionSection />
        </Suspense>
      </div>
    </ParentsLayout>
  );
}
