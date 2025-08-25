import { Button } from "@/shared/components/ui/button";
import { RotateCw } from "lucide-react";
import { useDraw } from "../hooks";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/shared/components/ui/tooltip";

export function DrawToolbarClear() {
  const { canvasRef } = useDraw();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="destructive"
          onClick={() => canvasRef.current?.clearCanvas()}
          className="cursor-pointer rounded-full"
        >
          <RotateCw size={20} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-secondary">
        전체삭제
      </TooltipContent>
    </Tooltip>
  );
}
