import type { FairyTale } from "@/entities/fairy-tale/models/fairy-tale";
import { Badge } from "@/shared/components/ui/badge";

type FairyTaleCardGridProps = {
  tales: FairyTale[];
  className?: string;
  ariaLabel?: string;
};

export default function FairyTaleCardGrid({ tales, className = "", ariaLabel = "오늘의 픽" }: FairyTaleCardGridProps) {
  if (!tales?.length) return null;

  return (
    <div
      className={["mt-4 grid gap-4", "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5", className].join(" ")}
      aria-label={ariaLabel}
      role="list"
    >
      {tales.map((tale) => (
        <article
          key={tale.id}
          role="listitem"
          className="group relative rounded-md overflow-hidden bg-muted shadow hover:shadow-md transition"
          aria-label={`${tale.title}`}
        >
          <div className="relative aspect-[3/4]">
            <img
              src={tale.thumbnail_image}
              alt={tale.title}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.02] transition"
            />
          </div>

          <div className="absolute left-2 top-2">
            <Badge className="rounded-full bg-secondary text-secondary-foreground h-5 px-2 text-[11px]">
              카테고리 {tale.category_id}
            </Badge>
          </div>

          <div className="absolute inset-x-0 bottom-0">
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
            <div className="relative p-3">
              <h4 className="text-background font-extrabold leading-snug line-clamp-2">{tale.title}</h4>
              <p className="mt-1 text-background/90 text-xs">
                {tale.author} · {tale.page_count}p
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
