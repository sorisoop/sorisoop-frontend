import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { CommonLayout } from "@/shared/layouts";
import Hero from "@/widgets/hero";
import Categories from "@/widgets/categories";
import TitleBar from "@/shared/components/ui/title-bar";
import { useFairyTalesByCategoryInfinite } from "@/entities/fairy-tale/api/hooks";
import { FairyTaleCard } from "@/features/fairy-tale/components/variants";

export default function HomePage() {
  const [homeFilter, setHomeFilter] = useState<string>("전체");
  const { data } = useFairyTalesByCategoryInfinite(1);
  const tales = data?.pages[0] ?? [];

  return (
    <CommonLayout title="">
      <Tabs value={homeFilter} onValueChange={(v: string) => setHomeFilter(v)} className="w-full pt-2">
        <TabsList className="relative h-10 bg-transparent p-0 gap-8 rounded-none">
          {(["전체", "창작 동화"] as const).map((tabKey) => (
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
      </Tabs>

      <Hero
        title="동화 만들기"
        description="아이의 그림으로 이야기가 만들어져요! 세상에 단 하나뿐인 동화책을 만들어보세요."
        image={{
          mobile: "/assets/hero/story-create-mobile.webp",
          tablet: "/assets/hero/story-create-tablet.webp",
        }}
        alt="동화 만들기"
      />

      <Categories />

      <section className="pt-10">
        <TitleBar title="이번 주 이야기 상자" subtitle="반짝반짝, 이번 주에 꺼내 보는 이야기" />
        <FairyTaleCard.HighlightRow tales={tales} />
      </section>

      <section className="pt-10">
        <TitleBar title="오늘의 픽" subtitle="소리숲이 고른 오늘의 이야기" />
        <FairyTaleCard.Grid tales={tales} />
      </section>
    </CommonLayout>
  );
}
