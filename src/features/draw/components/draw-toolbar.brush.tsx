import { Popover, PopoverTrigger, PopoverContent } from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { Slider } from "@/shared/components/ui/slider";
import { useDraw } from "../hooks";

export function DrawToolbarBrush() {
  const { brushWidth, setBrushWidth, setIsEraser, isEraser } = useDraw();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className={`rounded-full ${!isEraser ? "ring-2 ring-ring" : ""}`}
          onClick={() => setIsEraser(false)}
        >
          ✏️
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="center" className="z-50 max-w-48">
        <div className="flex flex-col gap-2 items-center">
          <span className="text-sm text-foreground">브러시</span>
          <div className="bg-foreground rounded-full" style={{ width: brushWidth, height: brushWidth }} />
          <Slider
            value={[brushWidth]}
            min={1}
            max={30}
            step={1}
            onValueChange={(val) => setBrushWidth(val[0])}
            className="w-40"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
