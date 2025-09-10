import type { HTMLAttributes } from "react";
import { Undo2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/shared/components/ui/tooltip";
import { useDraw } from "@/features/draw/hooks";

export function DrawToolbarUndo({ className }: HTMLAttributes<HTMLDivElement>) {
  const { canvasRef } = useDraw();

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  return (
    <div className={className}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="secondary" onClick={handleUndo} className="cursor-pointer rounded-full">
            <Undo2 size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-secondary">
          이전획 되돌리기
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
