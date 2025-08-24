import { Link } from "react-router-dom";
import type { FairyTaleResponse } from "@/entities/fairy-tale/model";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Heart } from "lucide-react";
import { useState } from "react";

type FairyTaleCardGridTwoColProps = {
  tales: FairyTaleResponse[];
  className?: string;
  ariaLabel?: string;
};

export default function FairyTaleCardGridTwoCol({
  tales,
  className,
  ariaLabel = "검색 결과",
}: FairyTaleCardGridTwoColProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className={cn("mt-4 grid gap-4 grid-cols-2", className)} aria-label={ariaLabel} role="list">
      {tales.map((tale) => {
        const isFavorite = favorites.includes(tale.id);

        return (
          <Link
            key={tale.id}
            to={`/fairy-tale/${tale.id}`}
            role="listitem"
            className="group relative block aspect-[3/4] rounded-md overflow-hidden bg-muted shadow hover:shadow-md transition cursor-pointer"
            aria-label={`동화책 ${tale.title}`}
          >
            <img
              src={tale.thumbnailImage}
              alt={`동화책 ${tale.title} 표지`}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition"
            />

            <div className="absolute right-2 top-2">
              <Badge className="rounded-full bg-primary text-secondary h-5 px-2 text-xs">{tale.name}</Badge>
            </div>

            <div className="absolute right-2 bottom-2 z-20 pointer-events-auto">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label={`동화책 ${tale.title} 찜하기`}
                aria-pressed={isFavorite}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(tale.id);
                }}
                className="h-8 w-8 rounded-full bg-background shadow-md transition cursor-pointer"
              >
                <Heart
                  className={cn(
                    "w-4 h-4 transition",
                    isFavorite ? "fill-destructive text-destructive" : "text-foreground"
                  )}
                />
              </Button>
            </div>

            <div className="absolute inset-x-0 bottom-0 pointer-events-none z-0">
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="relative p-2">
                <h4 className="font-serif italic text-sm font-bold text-background drop-shadow-sm leading-snug line-clamp-2">
                  {tale.title}
                </h4>
                <p className="font-serif italic mt-1 text-background/90 text-[10px]">
                  {tale.author} · {tale.pageCount}p
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
