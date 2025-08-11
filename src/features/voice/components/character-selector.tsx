"use client";

import { useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import type { CharacterCandidate } from "../types";

type CharacterSelectorProps = {
  items: ReadonlyArray<CharacterCandidate>;
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function CharacterSelector({ items, selectedId, onSelect }: CharacterSelectorProps) {
  const selected = useMemo(() => items.find((c) => c.id === selectedId), [items, selectedId]);

  return (
    <>
      {/* 모바일: 프리뷰 + 리스트 */}
      <div className="md:hidden flex flex-col items-center gap-6">
        {selected && (
          <div className="grid h-32 w-32 sm:h-40 sm:w-40 place-items-center rounded-full bg-secondary overflow-hidden">
            <img
              src={selected.avatar}
              alt={selected.name}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        <ul className="flex items-center gap-3 sm:gap-4">
          {items.map((c) => {
            const active = selectedId === c.id;
            return (
              <li key={c.id}>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => onSelect(c.id)}
                  className={cn(
                    "!inline-grid place-items-center !p-0 !h-12 !w-12 lg:!h-14 lg:!w-14",
                    "!bg-transparent hover:!bg-transparent !border-0",
                    "rounded-full overflow-hidden cursor-pointer",
                    "ring-2 ring-transparent ring-offset-2 ring-offset-background",
                    "focus-visible:ring-primary transition-all duration-200",
                    active && "ring-primary scale-105"
                  )}
                  aria-pressed={active}
                  aria-label={`${c.name} 선택`}
                >
                  <img src={c.avatar} alt={c.name} className="h-full w-full object-cover" />
                </Button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 데스크탑: 라벨 + 리스트 */}
      <div className="hidden md:grid md:grid-cols-12 md:items-center">
        <div className="md:col-span-4 self-center">
          <h2 className="text-lg lg:text-xl font-semibold">캐릭터 선택</h2>
          <p className="text-sm text-muted-foreground">프로필 이미지로 보여질 캐릭터를 선택해 주세요.</p>
        </div>

        <div className="md:col-span-8">
          <ul className="flex justify-end items-center gap-3 lg:gap-4">
            {items.map((c) => {
              const active = selectedId === c.id;
              return (
                <li key={c.id}>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => onSelect(c.id)}
                    className={cn(
                      "!inline-grid place-items-center !p-0 !h-12 !w-12 lg:!h-14 lg:!w-14",
                      "!bg-transparent hover:!bg-transparent !border-0",
                      "rounded-full overflow-hidden cursor-pointer",
                      "ring-2 ring-transparent ring-offset-2 ring-offset-background",
                      "focus-visible:ring-primary transition-all duration-200",
                      active && "ring-primary scale-105"
                    )}
                    aria-pressed={active}
                    aria-label={`${c.name} 선택`}
                  >
                    <img src={c.avatar} alt={c.name} className="h-full w-full object-cover" />
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="my-4 border-0 md:border-b border-border" />
    </>
  );
}
