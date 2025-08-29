import { useState } from "react";
import { useCustomFairyTales, useFairyTaleCategories } from "@/entities/fairy-tale/api/hooks";
import { FairyTaleCard } from "@/features/fairy-tale/components/variants";
import { Button } from "@/shared/components/ui/button";
import { useDragScroll } from "@/shared/hooks";

export default function CustomFairyTaleContent() {
  const [categoryId, setCategoryId] = useState(0);
  const { data: categories } = useFairyTaleCategories();
  const { data: tales = [] } = useCustomFairyTales(categoryId);
  const allCategories = [{ id: 0, name: "전체" }, ...(categories ?? [])];
  const { onMouseDown, onMouseMove, onMouseUp } = useDragScroll<HTMLDivElement>();

  return (
    <div className="space-y-4">
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
        <div className="mx-auto max-w-screen-xl border-border bro overflow-x-auto scrollbar-hide">
          <nav
            className="flex space-x-4 min-w-max px-4"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          >
            {allCategories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setCategoryId(category.id)}
                className={`
                    relative py-2 px-1 text-sm font-medium rounded-none flex-shrink-0
                    border-b transition-colors
                    ${
                      categoryId === category.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground"
                    }
                    hover:!bg-transparent active:!bg-transparent
                    focus-visible:outline-none focus-visible:ring-0
                `}
                variant="ghost"
              >
                {category.name}
              </Button>
            ))}
          </nav>
        </div>
      </div>

      <FairyTaleCard.Grid tales={tales} custom />
    </div>
  );
}
