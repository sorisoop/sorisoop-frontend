import type { HTMLAttributes } from "react";
import { RotateCw } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useDraw } from "@/features/draw/hooks";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/shared/components/ui/tooltip";

export function DrawToolbarClear({ className }: HTMLAttributes<HTMLDivElement>) {
  const { canvasRef, setStencil } = useDraw();

  const handleClear = () => {
    canvasRef.current?.clearCanvas();
    setStencil(null);
  };

  return (
    <div className={className}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="destructive" onClick={handleClear} className="cursor-pointer rounded-full">
            <RotateCw size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-secondary">
          전체삭제
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
