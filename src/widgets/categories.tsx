"use client";

import { useNavigate } from "react-router-dom";
import { useFairyTaleCategories } from "@/entities/fairy-tale/api/hooks";
import { Button } from "@/shared/components/ui/button";
import { useDragScroll } from "@/shared/hooks";
import { pickEmoji } from "@/shared/utils/emoji";
import TitleBar from "@/widgets/title-bar";

export default function Categories() {
  const { data: categories } = useFairyTaleCategories();
  const navigate = useNavigate();
  const { onMouseDown, onMouseMove, onMouseUp } = useDragScroll<HTMLDivElement>();

  const allCategories = [{ id: 0, name: "전체" }, ...(categories ?? [])];

  return (
    <section className="pt-8">
      <TitleBar title="이야기 종류" subtitle="관심 주제를 골라서 둘러보세요" />

      <div className="mt-3 -mx-4 px-4">
        <div
          className="flex gap-6 pb-2 py-1 overflow-x-auto overflow-y-visible scroll-smooth [scrollbar-width:none] [scrollbar-color:transparent_transparent] outline-none focus:outline-none focus-visible:outline-none"
          tabIndex={-1}
          style={{ WebkitOverflowScrolling: "touch" }}
          aria-label="카테고리 선택"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        >
          {allCategories.map(({ id, name }) => {
            const emoji = pickEmoji(name);
            return (
              <div key={id ?? name} className="shrink-0 text-center">
                <Button
                  variant="ghost"
                  onClick={() => navigate(`/fairy-tale/category/${encodeURIComponent(id)}`)}
                  className={[
                    "relative mx-auto h-20 w-20 p-0 rounded-full cursor-pointer",
                    "bg-muted border border-border",
                    "shadow-sm hover:shadow-md transition",
                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                  ].join(" ")}
                >
                  <span className="text-4xl select-none">{emoji}</span>
                </Button>
                <p className="mt-2 text-sm font-medium leading-tight text-foreground">{name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
