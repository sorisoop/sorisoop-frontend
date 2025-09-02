"use client";

import { Button } from "@/shared/components/ui/button";

export default function CategoriesNavSkeleton() {
  const categories = [
    { id: 0, name: "전체" },
    { id: 1, name: "과학" },
    { id: 2, name: "동물" },
    { id: 3, name: "모험" },
    { id: 4, name: "생활" },
    { id: 5, name: "역사" },
    { id: 6, name: "음식" },
    { id: 7, name: "자연" },
  ];

  const defaultSelectedId = 0;

  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
      <div className="mx-auto max-w-screen-xl border-border overflow-x-auto scrollbar-hide">
        <nav className="flex space-x-2 min-w-max px-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              disabled
              className={`
                relative px-3 py-2 text-sm font-medium rounded-none flex-shrink-0
                border-b transition-colors
                ${
                  category.id === defaultSelectedId
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground"
                }
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
