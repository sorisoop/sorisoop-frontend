import { BackHeaderLayout } from "@/shared/layouts";
import { useRef, useState } from "react";
import { ReactSketchCanvas, type ReactSketchCanvasRef } from "react-sketch-canvas";
import { Button } from "@/shared/components/ui/button";
import { Slider } from "@/shared/components/ui/slider";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/components/ui/popover";

const COLORS = [
  { name: "검정", hex: "#000000", tw: "bg-foreground" },
  { name: "빨강", hex: "#ef4444", tw: "bg-red-500" },
  { name: "파랑", hex: "#3b82f6", tw: "bg-blue-500" },
  { name: "초록", hex: "#22c55e", tw: "bg-green-500" },
  { name: "노랑", hex: "#eab308", tw: "bg-yellow-400" },
  { name: "주황", hex: "#f97316", tw: "bg-orange-500" },
  { name: "보라", hex: "#a855f7", tw: "bg-purple-500" },
  { name: "분홍", hex: "#ec4899", tw: "bg-pink-400" },
  { name: "갈색", hex: "#44403c", tw: "bg-stone-600" },
  { name: "회색", hex: "#9ca3af", tw: "bg-muted" },
];

export default function DrawPage() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isEraser, setIsEraser] = useState(false);
  const [brushWidth, setBrushWidth] = useState(4);
  const [eraserWidth, setEraserWidth] = useState(12);

  // 커서 상태
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  const handleColorChange = (hexColor: string) => {
    setSelectedColor(hexColor);
    setIsEraser(false);
  };

  const handleEraser = () => {
    setIsEraser(true);
  };

  const handleClear = () => {
    canvasRef.current?.clearCanvas();
  };

  return (
    <BackHeaderLayout title="그림 그리기">
      <div className="h-[calc(100vh-104px)] py-4 flex flex-col lg:flex-row gap-4">
        {/* 모바일 툴바 */}
        <div className="lg:hidden flex flex-wrap gap-3 justify-center px-4">
          {COLORS.map((c) => (
            <Button
              key={c.hex}
              variant="outline"
              size="icon"
              onClick={() => handleColorChange(c.hex)}
              className={`rounded-full transition-all ${c.tw} ${
                selectedColor === c.hex && !isEraser ? "scale-125" : "scale-100"
              }`}
              aria-label={`색상 ${c.name}`}
            />
          ))}

          {/* 브러시 버튼 */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="link"
                size="icon"
                className={`rounded-full bg-gray-100 ${!isEraser ? "ring-2 ring-gray-400" : ""}`}
                onClick={() => setIsEraser(false)}
              >
                ✏️
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" align="center" className="z-50">
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm">브러시 굵기 {brushWidth}px</span>
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

          {/* 지우개 버튼 */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="link"
                size="icon"
                onClick={handleEraser}
                className={`rounded-full bg-gray-200 ${isEraser ? "ring-2 ring-gray-400" : ""}`}
              >
                🧽
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" align="center" className="z-50">
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm">지우개 굵기 {eraserWidth}px</span>
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

          <Button onClick={handleClear} className="bg-destructive text-white hover:bg-destructive/90 px-3">
            전체삭제
          </Button>
        </div>

        <div
          className="flex-1 min-h-0 relative"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setCursorPos({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            });
            setShowCursor(true);
          }}
          onMouseLeave={() => setShowCursor(false)}
        >
          <ReactSketchCanvas
            ref={canvasRef}
            className={`w-full h-full rounded-lg !border-4 !border-muted-foreground !border-dotted bg-white ${
              isEraser ? "cursor-none" : "cursor-crosshair"
            }`}
            strokeWidth={isEraser ? eraserWidth : brushWidth}
            strokeColor={isEraser ? "#FFFFFF" : selectedColor}
          />

          {/* 지우개 모드 + 커서 보일 때만 원형 커서 */}
          {isEraser && showCursor && (
            <div
              className="absolute rounded-full border-2 border-gray-600 border-dashed bg-transparent pointer-events-none"
              style={{
                left: cursorPos.x - eraserWidth / 2,
                top: cursorPos.y - eraserWidth / 2,
                width: eraserWidth,
                height: eraserWidth,
              }}
            />
          )}
        </div>

        <div className="hidden lg:flex flex-col gap-4 w-20 items-center py-4">
          {COLORS.map((c) => (
            <Button
              key={c.hex}
              variant="link"
              size="icon"
              onClick={() => handleColorChange(c.hex)}
              className={`rounded-full transition-all ${c.tw} ${
                selectedColor === c.hex && !isEraser ? "scale-125" : "scale-100"
              }`}
            />
          ))}

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="link"
                size="icon"
                className={`rounded-full bg-gray-100 ${!isEraser ? "ring-2 ring-gray-400" : ""}`}
                onClick={() => setIsEraser(false)}
              >
                ✏️
              </Button>
            </PopoverTrigger>
            <PopoverContent side="right" align="center" className="z-50">
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm">브러시 굵기 {brushWidth}px</span>
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

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleEraser}
                className={`rounded-full bg-gray-200 ${isEraser ? "ring-2 ring-gray-400" : ""}`}
              >
                🧽
              </Button>
            </PopoverTrigger>
            <PopoverContent side="right" align="center" className="z-50">
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm">지우개 굵기 {eraserWidth}px</span>
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

          <Button onClick={handleClear} className="bg-destructive text-white hover:bg-destructive/90 px-2 mt-2">
            전체삭제
          </Button>
        </div>
      </div>
    </BackHeaderLayout>
  );
}
