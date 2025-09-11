import type { HTMLAttributes } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/avatar";
import { useDraw } from "@/features/draw/hooks";
import { X } from "lucide-react";

export function DrawToolbarCharacter({ className }: HTMLAttributes<HTMLDivElement>) {
  const { stencil, setStencil } = useDraw();

  const characters = [
    { id: "sponge", src: "/assets/character/sponge-bob.webp", label: "스폰지밥" },
    { id: "doraemon", src: "/assets/character/doraemon.webp", label: "도라에몽" },
  ];

  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="w-10 h-10 cursor-pointer ring-1 ring-gray-300">
            <AvatarImage src={stencil ?? undefined} alt="character" className="object-cover" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        </PopoverTrigger>

        <PopoverContent className="w-48 grid grid-cols-3 gap-2">
          <button
            key="clear"
            onClick={() => setStencil(null)}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
          >
            <X className="text-destructive" />
          </button>

          {characters.map((c) => (
            <button
              key={c.id}
              onClick={() => setStencil(c.src)}
              className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-gray-200 hover:ring-primary"
            >
              <img src={c.src} alt={c.label} className="w-full h-full object-cover" />
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
