import { ReactSketchCanvas } from "react-sketch-canvas";
import { useState, type HTMLAttributes } from "react";
import { useDraw } from "../hooks/use-draw";

export default function DrawCanvas({ className }: HTMLAttributes<HTMLDivElement>) {
  const { color, isEraser, brushWidth, eraserWidth, canvasRef, stencil } = useDraw();
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      className={`flex-1 min-h-0 relative p-4 bg-muted rounded-lg shadow-md ${className}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onTouchMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const touch = e.touches[0];
        if (!touch) return;
        setCursor({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
      }}
      onMouseLeave={() => setCursor(null)}
      onTouchEnd={() => setCursor(null)}
    >
      <div
        className="
          relative w-full h-full rounded-lg border-1 border-border shadow-inner
          bg-gradient-to-b from-background to-background
          [background-image:repeating-linear-gradient(to_bottom,theme(colors.background)_0,theme(colors.background)_28px,theme(colors.muted)_29px)]
          bg-[length:100%_30px]
        "
      >
        {stencil && (
          <img
            src={stencil}
            alt="stencil"
            className="
              absolute inset-0 w-full h-full object-contain
              opacity-40 z-0
              pointer-events-none
              filter grayscale contrast(200%) brightness(0)
            "
          />
        )}

        <ReactSketchCanvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full rounded-lg ${isEraser ? "cursor-none" : "cursor-crosshair"} z-20`}
          strokeWidth={brushWidth}
          eraserWidth={eraserWidth}
          strokeColor={color}
          canvasColor="#ffffff"
        />

        {/* 지우개 커서 */}
        {isEraser && cursor && (
          <div
            className="absolute rounded-full border-2 border-muted-foreground border-dashed pointer-events-none z-30"
            style={{
              left: cursor.x - eraserWidth / 2 - 15,
              top: cursor.y - eraserWidth / 2 - 15,
              width: eraserWidth,
              height: eraserWidth,
            }}
          />
        )}
      </div>
    </div>
  );
}
