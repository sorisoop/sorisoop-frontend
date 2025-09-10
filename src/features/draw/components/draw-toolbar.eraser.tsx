import type { HTMLAttributes } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { Slider } from "@/shared/components/ui/slider";
import { useDraw } from "@/features/draw/hooks";

export function DrawToolbarEraser({ className }: HTMLAttributes<HTMLDivElement>) {
  const { eraserWidth, setEraserWidth, isEraser, enablePen, enableEraser } = useDraw();

  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className={`rounded-full ${isEraser ? "ring-2 ring-ring" : ""}`}
            onClick={() => (isEraser ? enablePen() : enableEraser())}
          >
            🧽
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="center" className="z-50 max-w-48">
          <div className="flex flex-col gap-2 items-center">
            <span className="text-sm text-muted-foreground">지우개 크기</span>
            <div className="bg-foreground rounded-full" style={{ width: eraserWidth, height: eraserWidth }} />
            <Slider
              value={[eraserWidth]}
              min={5}
              max={50}
              step={1}
              onValueChange={(val) => setEraserWidth(val[0])}
              className="w-40"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
