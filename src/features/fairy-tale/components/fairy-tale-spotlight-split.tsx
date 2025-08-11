"use client";

import type { FairyTale } from "@/entities/fairy-tale/models/fairy-tale";
import { Badge } from "@/shared/components/ui/badge";

type FairyTaleSpotlightSplitProps = {
  tales: FairyTale[];
  className?: string;
};

export default function FairyTaleSpotlightSplit({ tales, className = "" }: FairyTaleSpotlightSplitProps) {
  if (!tales || tales.length === 0) return null;

  const [main, ...rest] = tales;

  return (
    <div className={`mt-3 grid md:grid-cols-3 gap-4 ${className}`}>
      <article
        className="md:col-span-2 relative overflow-hidden rounded-lg bg-muted h-[240px] md:h-[260px] lg:h-[320px] shadow"
        aria-label={`${main.title} 배너`}
      >
        <img
          src={main.thumbnail_image}
          alt={main.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          <div className="relative">
            <Badge className="h-5 rounded-full bg-secondary text-secondary-foreground px-2 text-[11px]">
              카테고리 {main.category_id}
            </Badge>
            <h4 className="mt-2 text-lg md:text-xl font-extrabold text-background">{main.title}</h4>
            <p className="mt-1 text-background/90 text-sm">
              {main.author} · {main.page_count}p
            </p>
          </div>
        </div>
      </article>

      <div className="space-y-3">
        {rest.map((tale) => (
          <article
            key={tale.id}
            className="flex gap-3 rounded-md bg-card border p-2 hover:bg-accent/20 transition"
            aria-label={`${tale.title}`}
          >
            <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-sm bg-muted">
              <img
                src={tale.thumbnail_image}
                alt={tale.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Badge className="h-5 rounded-full bg-secondary text-secondary-foreground px-2 text-[11px]">
                  카테고리 {tale.category_id}
                </Badge>
                <h4 className="font-semibold truncate">{tale.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                {tale.author} · {tale.page_count}p
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
