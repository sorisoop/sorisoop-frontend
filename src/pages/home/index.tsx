import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs";
import { CommonLayout } from "@/shared/layouts";
import { FairyTaleCard } from "@/features/fairy-tale/components/variants";
import {
  Categories,
  CategoriesSkeleton,
  Hero,
  TodayPickWidget,
  WeeklyBoxWidget,
  TitleBar,
  MyCustomFairyTale,
} from "@/widgets";
import { ErrorFallback } from "@/shared/components/error-boundary";
import { AssignedMissionListSkeleton, MissionDetailDialog } from "@/features/mission/components";
import AssignedMissionList from "@/features/mission/components/assigned-mission-list";

export default function HomePage() {
  const navigate = useNavigate();
  const [homeFilter, setHomeFilter] = useState<"전체" | "창작 동화" | "갤러리" | "미션">("전체");

  return (
    <CommonLayout title="">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Tabs
          value={homeFilter}
          onValueChange={(v) => {
            if (v === "갤러리") {
              navigate("/gallery");
              return;
            }
            setHomeFilter(v as typeof homeFilter);
          }}
          className="w-full pt-2"
        >
          <TabsList className="relative h-10 bg-transparent p-0 gap-8 rounded-none">
            {(["전체", "창작 동화", "갤러리", "미션"] as const).map((tabKey) => (
              <TabsTrigger
                key={tabKey}
                value={tabKey}
                className={[
                  "relative h-10 px-0 text-base font-bold tracking-tight cursor-pointer",
                  "text-muted-foreground hover:text-foreground data-[state=active]:text-foreground",
                  "!rounded-none !bg-transparent data-[state=active]:!bg-transparent",
                  "!shadow-none data-[state=active]:!shadow-none",
                  "focus:outline-none focus-visible:outline-none",
                  "focus-visible:!ring-0 !ring-0 !ring-offset-0",
                  "after:absolute after:-bottom-[2px] after:left-0 after:h-[3px] after:w-full",
                  "after:bg-primary after:origin-left after:scale-x-0 after:transition-transform",
                  "data-[state=active]:after:scale-x-100",
                ].join(" ")}
              >
                {tabKey}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="전체">
            <Hero
              title="동화 만들기"
              description="아이의 그림으로 이야기가 만들어져요! 세상에 단 하나뿐인 동화책을 만들어보세요."
              image={{
                mobile: "/assets/hero/story-create-mobile.webp",
                tablet: "/assets/hero/story-create-tablet.webp",
              }}
              alt="동화 만들기"
            />

            <Suspense fallback={<CategoriesSkeleton />}>
              <Categories />
            </Suspense>

            <section className="pt-10">
              <TitleBar title="이번 주 이야기 상자" subtitle="반짝반짝, 이번 주에 꺼내 보는 이야기" />
              <Suspense fallback={<FairyTaleCard.HighlightRowSkeleton />}>
                <WeeklyBoxWidget />
              </Suspense>
            </section>

            <section className="pt-10">
              <TitleBar title="오늘의 픽" subtitle="소리숲이 고른 오늘의 이야기" />
              <Suspense fallback={<FairyTaleCard.GridSkeleton />}>
                <TodayPickWidget />
              </Suspense>
            </section>
          </TabsContent>
          <TabsContent value="창작 동화">
            <Suspense fallback={<FairyTaleCard.GridSkeleton />}>
              <MyCustomFairyTale />
            </Suspense>
          </TabsContent>
          <TabsContent value="갤러리">
            <div className="p-6 text-center text-muted-foreground">갤러리 컨텐츠 준비 중...</div>
          </TabsContent>
          <TabsContent value="미션">
            <Suspense fallback={<AssignedMissionListSkeleton />}>
              <AssignedMissionList>
                {(missionId, open, setOpen) => (
                  <MissionDetailDialog missionId={missionId} open={open} onOpenChange={setOpen} />
                )}
              </AssignedMissionList>
            </Suspense>
          </TabsContent>
        </Tabs>
        <FloatingCreateButton />
      </ErrorBoundary>
    </CommonLayout>
  );
}
