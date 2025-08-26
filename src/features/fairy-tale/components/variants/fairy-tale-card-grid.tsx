import { Link } from "react-router-dom";
import type { FairyTaleResponse } from "@/entities/fairy-tale/model";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Heart } from "lucide-react";
import { useAddFavorite, useDeleteFavorite } from "@/entities/fairy-tale/api/mutations";

type FairyTaleCardGridProps = {
  tales: FairyTaleResponse[];
  className?: string;
  ariaLabel?: string;
  custom?: boolean;
};

export default function FairyTaleCardGrid({
  tales,
  className,
  ariaLabel = "오늘의 픽",
  custom = false,
}: FairyTaleCardGridProps) {
  const addFavorite = useAddFavorite();
  const deleteFavorite = useDeleteFavorite();

  const handleToggle = (tale: FairyTaleResponse) => {
    if (tale.isFavorite) deleteFavorite.mutate({ fairyTaleId: tale.id });
    else addFavorite.mutate({ fairyTaleId: tale.id });
  };

  return (
    <div
      className={cn("mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5", className)}
      aria-label={ariaLabel}
      role="list"
    >
      {tales.map((tale) => (
        <Link
          key={tale.id}
          to={custom ? `/fairy-tale/custom/${tale.id}` : `/fairy-tale/${tale.id}`}
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
            <Badge className="rounded-full bg-primary text-secondary h-5 px-2 text-xs">{tale.categoryName}</Badge>
          </div>

          {!custom && (
            <div className="absolute right-2 bottom-2 z-20 pointer-events-auto">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label={`동화책 ${tale.title} 찜하기`}
                aria-pressed={tale.isFavorite}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleToggle(tale);
                }}
                className="h-8 w-8 rounded-full bg-background shadow-md transition cursor-pointer"
              >
                <Heart
                  className={cn(
                    "w-4 h-4 transition",
                    tale.isFavorite ? "fill-destructive text-destructive" : "text-foreground"
                  )}
                />
              </Button>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 pointer-events-none z-0">
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative p-3">
              <h4 className="font-serif italic text-lg md:text-xl font-bold text-background drop-shadow-sm leading-snug line-clamp-2">
                {tale.title}
              </h4>
              <p className="font-serif italic mt-1 text-background/90 text-xs">
                {tale.author} · {tale.pageCount}p
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
