import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { CommonLayout } from "@/shared/layouts";
import type { FairyTale } from "@/entities/fairy-tale/models/fairy-tale";
import { FairyTaleSnapShelf, FairyTaleSpotlightSplit } from "@/features/fairy-tale/components";
import Hero from "@/widgets/hero";
import Categories from "@/widgets/categories";
import TitleBar from "@/shared/components/ui/title-bar";

const PICKS: FairyTale[] = [
  {
    id: 1201,
    category_id: 4,
    title: "바닷마을 우체국",
    author: "한솔",
    thumbnail_image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop",
    page_count: 12,
  },
  {
    id: 1202,
    category_id: 2,
    title: "코끼리와 약속",
    author: "이담",
    thumbnail_image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    page_count: 10,
  },
  {
    id: 1203,
    category_id: 6,
    title: "구름빵 공작소",
    author: "류보리",
    thumbnail_image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1600&auto=format&fit=crop",
    page_count: 15,
  },
  {
    id: 1204,
    category_id: 5,
    title: "달력 속 비밀문",
    author: "윤해",
    thumbnail_image: "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1600&auto=format&fit=crop",
    page_count: 14,
  },
  {
    id: 1205,
    category_id: 3,
    title: "파랑새를 찾아서",
    author: "백로",
    thumbnail_image: "https://images.unsplash.com/photo-1451188502541-13943edb6acb?q=80&w=1600&auto=format&fit=crop",
    page_count: 13,
  },
  {
    id: 1206,
    category_id: 7,
    title: "숲의 도서관",
    author: "호연",
    thumbnail_image: "https://images.unsplash.com/photo-1431440869543-efaf3388c585?q=80&w=1600&auto=format&fit=crop",
    page_count: 11,
  },
];

export default function HomePage() {
  const [homeFilter, setHomeFilter] = useState<string>("전체");

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
        {/* <FairyTaleSpotlightSplit tales={PICKS.slice(0, 3)} /> */}
      </section>

      <section className="pt-10">
        <TitleBar title="새로 나온 그림책" subtitle="따끈따끈 신간을 지금 만나보세요" />
        {/* <FairyTaleSnapShelf tales={PICKS} /> */}
      </section>

      <section className="pt-10 pb-16">
        <TitleBar title="오늘의 픽" subtitle="소리숲이 고른 오늘의 이야기" />
      </section>
    </CommonLayout>
  );
}
