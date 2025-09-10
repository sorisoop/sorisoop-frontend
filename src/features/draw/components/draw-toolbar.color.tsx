import type { HTMLAttributes } from "react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { useDraw } from "../hooks";

const COLORS = [
  { name: "검정", hex: "#000000", tw: "bg-black" },
  { name: "빨강", hex: "#ef4444", tw: "bg-red-500" },
  { name: "노랑", hex: "#facc15", tw: "bg-yellow-400" },
  { name: "초록", hex: "#22c55e", tw: "bg-green-500" },
  { name: "파랑", hex: "#3b82f6", tw: "bg-blue-500" },
  { name: "보라", hex: "#8b5cf6", tw: "bg-violet-500" },
  { name: "갈색", hex: "#92400e", tw: "bg-amber-800" },
  { name: "살색", hex: "#FCD5B5", tw: "bg-[#FCD5B5]" },
];

export function DrawToolbarColor({ className }: HTMLAttributes<HTMLDivElement>) {
  const { color, setColor, setIsEraser } = useDraw();

  return (
    <div className={cn("flex flex-row gap-2 lg:flex-col lg:gap-2 ", className)}>
      {COLORS.map((c) => (
        <Button
          key={c.hex}
          variant="link"
          size="icon"
          onClick={() => {
            setColor(c.hex);
            setIsEraser(false);
          }}
          className={`rounded-full cursor-pointer ${c.tw} ${color === c.hex ? "scale-110" : ""}`}
        />
      ))}
    </div>
  );
}
