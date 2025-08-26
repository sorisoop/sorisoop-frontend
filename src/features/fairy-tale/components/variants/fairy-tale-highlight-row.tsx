import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { FairyTaleResponse } from "@/entities/fairy-tale/model";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { useDragPreventClick, useDragScroll } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import { useAddFavorite, useDeleteFavorite } from "@/entities/fairy-tale/api/mutations";

type FairyTaleHighlightRowProps = {
  tales: FairyTaleResponse[];
  className?: string;
  custom?: boolean;
};

export default function FairyTaleHighlightRow({ tales, className = "", custom = false }: FairyTaleHighlightRowProps) {
  const { onMouseDown, onMouseMove, onMouseUp } = useDragScroll<HTMLDivElement>();
  const { handleMouseDown, handleMouseMove, handleClick } = useDragPreventClick(8);

  const addFavorite = useAddFavorite();
  const deleteFavorite = useDeleteFavorite();

  const handleToggle = (tale: FairyTaleResponse) => {
    if (tale.isFavorite) deleteFavorite.mutate({ fairyTaleId: tale.id });
    else addFavorite.mutate({ fairyTaleId: tale.id });
  };

  return (
    <div
      className={`w-full overflow-x-auto scrollbar-hide mt-4 ${className}`}
      onMouseDown={(e) => {
        onMouseDown(e);
        handleMouseDown(e);
      }}
      onMouseMove={(e) => {
        onMouseMove(e);
        handleMouseMove(e);
      }}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
    >
      <div className="flex gap-4" role="list">
        {tales.map((tale) => (
          <Link
            key={tale.id}
            to={custom ? `/fairy-tale/custom/${tale.id}` : `/fairy-tale/${tale.id}`}
            role="listitem"
            onClick={handleClick}
            className="relative flex-shrink-0 w-[240px] md:w-[280px] overflow-hidden rounded-md shadow-md cursor-pointer"
            aria-label={tale.title}
          >
            <img src={tale.thumbnailImage} alt={tale.title} className="w-full h-auto object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 px-3 pb-4">
              <Badge className="text-secondary font-semibold">{tale.categoryName}</Badge>
              <h3 className="font-serif italic text-base md:text-lg font-bold text-secondary drop-shadow line-clamp-1">
                {tale.title}
              </h3>
              <p className="font-serif italic text-xs text-secondary line-clamp-1">
                {tale.author} · {tale.pageCount}p
              </p>
            </div>

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
          </Link>
        ))}
      </div>
    </div>
  );
}
