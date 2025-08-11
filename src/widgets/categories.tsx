import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import TitleBar from "@/shared/components/ui/title-bar";

const ALL_CATEGORIES = [
  { key: "전체" as const, label: "전체", emoji: "🧺" },
  { key: "과학" as const, label: "과학", emoji: "🔬" },
  { key: "동물" as const, label: "동물", emoji: "🐻" },
  { key: "모험" as const, label: "모험", emoji: "🏔️" },
  { key: "생활" as const, label: "생활", emoji: "🏠" },
  { key: "역사" as const, label: "역사", emoji: "🏛️" },
];

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState<(typeof ALL_CATEGORIES)[number]["key"]>("전체");

  return (
    <section className="pt-8">
      <TitleBar title="이야기 종류" subtitle="관심 주제를 골라서 둘러보세요" />

      <div className="mt-3 -mx-4 px-4">
        <div
          className="flex gap-6 pb-2 py-1 overflow-x-auto overflow-y-visible scroll-smooth [scrollbar-width:none] [scrollbar-color:transparent_transparent] outline-none focus:outline-none focus-visible:outline-none"
          tabIndex={-1}
          style={{ WebkitOverflowScrolling: "touch" }}
          aria-label="카테고리 선택"
        >
          {ALL_CATEGORIES.map(({ key, label, emoji }) => {
            const selected = activeCategory === key;
            return (
              <div key={String(key)} className="shrink-0 text-center">
                <Button
                  variant="ghost"
                  onClick={() => setActiveCategory(key)}
                  aria-pressed={selected}
                  className={[
                    "relative mx-auto h-20 w-20 p-0 rounded-full cursor-pointer",
                    "bg-muted",
                    "border",
                    selected ? "border-2 border-primary" : "border-border",
                    "shadow-sm hover:shadow-md transition",
                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                  ].join(" ")}
                >
                  <span className="text-2xl select-none">{emoji}</span>
                </Button>
                <p
                  className={[
                    "mt-2 text-sm font-medium leading-tight",
                    selected ? "text-primary" : "text-foreground",
                  ].join(" ")}
                >
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
