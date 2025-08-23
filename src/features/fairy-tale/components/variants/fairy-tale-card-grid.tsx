import { Link } from "react-router-dom";
import type { FairyTaleResponse } from "@/entities/fairy-tale/models";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";

type FairyTaleCardGridProps = {
  tales: FairyTaleResponse[];
  className?: string;
  ariaLabel?: string;
};

export default function FairyTaleCardGrid({ tales, className, ariaLabel = "오늘의 픽" }: FairyTaleCardGridProps) {
  return (
    <div
      className={cn("mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5", className)}
      aria-label={ariaLabel}
      role="list"
    >
      {tales.map((tale) => (
        <Link
          key={tale.id}
          to={`/fairy-tale/${tale.id}/read`}
          role="listitem"
          className="group relative block aspect-[3/4] rounded-md overflow-hidden bg-muted shadow hover:shadow-md transition cursor-pointer"
          aria-label={`동화책 ${tale.title}`}
        >
          <img
            src={tale.thumbnailImage}
            alt={`동화책 ${tale.title} 표지`}
            className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition"
          />

          <div className="absolute right-2 top-2 pointer-events-none">
            <Badge className="rounded-full bg-primary text-secondary h-5 px-2 text-xs">{tale.name}</Badge>
          </div>

          <div className="absolute inset-x-0 bottom-0 pointer-events-none">
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative p-3">
              <h4 className="text-background font-extrabold leading-snug line-clamp-2">{tale.title}</h4>
              <p className="mt-1 text-background/90 text-xs">
                {tale.author} · {tale.pageCount}p
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
