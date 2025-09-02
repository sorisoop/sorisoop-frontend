import { useFairyTaleCategories } from "@/entities/fairy-tale/api/hooks";
import { Button } from "@/shared/components/ui/button";
import { useDragScroll } from "@/shared/hooks";

export default function CategoriesNav({
  categoryId,
  onChange,
}: {
  categoryId: number;
  onChange: (id: number) => void;
}) {
  const { data: categories } = useFairyTaleCategories();
  const { onMouseDown, onMouseMove, onMouseUp } = useDragScroll<HTMLDivElement>();

  const allCategories = [{ id: 0, name: "전체" }, ...(categories ?? [])];

  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
      <div
        className="mx-auto max-w-screen-xl border-border overflow-x-auto scrollbar-hide"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <nav className="flex space-x-4 min-w-max px-4">
          {allCategories.map((category) => (
            <Button
              key={category.id}
              onClick={() => onChange(category.id)}
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
  );
}
