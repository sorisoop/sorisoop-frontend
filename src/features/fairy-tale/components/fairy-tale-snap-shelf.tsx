import type { FairyTale } from "@/entities/fairy-tale/models/fairy-tale";
import { Badge } from "@/shared/components/ui/badge";

type FairyTaleSnapShelfProps = {
  tales: FairyTale[];
  className?: string;
  ariaLabel?: string;
};

export default function FairyTaleSnapShelf({
  tales,
  className = "",
  ariaLabel = "새로나운 그림책",
}: FairyTaleSnapShelfProps) {
  if (!tales?.length) return null;

  return (
    <div className={`mt-3 ${className}`}>
      <div
        className="flex gap-4 pb-2 overflow-x-auto scroll-smooth snap-x snap-mandatory
                   [scrollbar-width:none] [scrollbar-color:transparent_transparent]"
        style={{ WebkitOverflowScrolling: "touch" }}
        aria-label={ariaLabel}
      >
        {tales.map((tale) => (
          <div
            key={tale.id}
            className="snap-start relative shrink-0 w-[156px] md:w-[184px] rounded-md overflow-hidden
                       transition will-change-transform active:scale-95 shadow-md"
          >
            <div className="relative aspect-[3/4] bg-muted">
              <img
                src={tale.thumbnail_image}
                alt={tale.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <Badge className="absolute right-2 top-2 z-10 inline-flex h-5 items-center rounded-full bg-secondary px-2 text-xs text-secondary-foreground">
                카테고리 {tale.category_id}
              </Badge>
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-3.5">
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/90 via-background/40 to-transparent pointer-events-none" />
                <div className="relative">
                  <h4 className="font-semibold leading-tight text-foreground truncate" title={tale.title}>
                    {tale.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {tale.author} · {tale.page_count}p
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
