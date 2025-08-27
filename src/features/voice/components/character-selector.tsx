import { useMemo } from "react";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/avatar";
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
      <div className="sm:hidden flex flex-col items-center gap-6">
        {selected && (
          <Avatar className="h-32 w-32 sm:h-40 sm:w-40 ring-2 ring-primary">
            <AvatarImage src={selected.avatar} alt={selected.name} />
            <AvatarFallback>{selected.name[0]}</AvatarFallback>
          </Avatar>
        )}

        <ul className="flex items-center gap-3 sm:gap-4">
          {items.map((c) => {
            const active = selectedId === c.id;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => onSelect(c.id)}
                  className={cn(
                    "rounded-full cursor-pointer transition-transform duration-200",
                    active && "ring-2 ring-primary scale-105"
                  )}
                  aria-pressed={active}
                  aria-label={`${c.name} 선택`}
                >
                  <Avatar className="h-12 w-12 lg:h-14 lg:w-14">
                    <AvatarImage src={c.avatar} alt={c.name} />
                    <AvatarFallback>{c.name[0]}</AvatarFallback>
                  </Avatar>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="hidden sm:grid sm:grid-cols-12 sm:items-center">
        <div className="sm:col-span-4 self-center">
          <h2 className="text-lg lg:text-xl font-semibold">캐릭터 선택</h2>
          <p className="text-sm text-muted-foreground">프로필 이미지로 보여질 캐릭터를 선택해 주세요.</p>
        </div>

        <div className="sm:col-span-8">
          <ul className="flex justify-end items-center gap-3 lg:gap-4">
            {items.map((c) => {
              const active = selectedId === c.id;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(c.id)}
                    className={cn(
                      "rounded-full cursor-pointer transition-transform duration-200",
                      active && "ring-2 ring-primary scale-105"
                    )}
                    aria-pressed={active}
                    aria-label={`${c.name} 선택`}
                  >
                    <Avatar className="h-12 w-12 lg:h-14 lg:w-14">
                      <AvatarImage src={c.avatar} alt={c.name} />
                      <AvatarFallback>{c.name[0]}</AvatarFallback>
                    </Avatar>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="my-4 border-0 sm:border-b border-border" />
    </>
  );
}
