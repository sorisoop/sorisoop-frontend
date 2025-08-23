import type { FairyTaleResponse } from "@/entities/fairy-tale/models";
import { Badge } from "@/shared/components/ui/badge";

type FairyTaleHighlightRowProps = {
  tales: FairyTaleResponse[];
  className?: string;
};

export default function FairyTaleHighlightRow({ tales, className = "" }: FairyTaleHighlightRowProps) {
  return (
    <div className={`w-full overflow-x-auto scrollbar-hide mt-4 ${className}`}>
      <div className="flex gap-4">
        {tales.map((tale) => (
          <article
            key={tale.id}
            className="relative flex-shrink-0 w-[240px] md:w-[280px] overflow-hidden rounded-md shadow-md cursor-pointer"
            aria-label={tale.title}
          >
            <img src={tale.thumbnailImage} alt={tale.title} className="w-full h-auto object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 px-3 pb-4">
              <Badge className="text-foreground font-semibold">{tale.name}</Badge>
              <h3 className="text-base md:text-lg font-bold text-white drop-shadow line-clamp-1">{tale.title}</h3>
              <p className="text-xs text-secondary line-clamp-1">
                {tale.author} · {tale.pageCount}p
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
