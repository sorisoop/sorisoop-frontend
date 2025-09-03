import { ReactSketchCanvas } from "react-sketch-canvas";
import { useState } from "react";
import { useDraw } from "../hooks/use-draw";

export default function DrawCanvas() {
  const { color, isEraser, brushWidth, eraserWidth, canvasRef } = useDraw();
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      className="flex-1 min-h-0 relative p-4 bg-muted rounded-lg shadow-md"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursor({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      onTouchMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const touch = e.touches[0];
        if (!touch) return;
        setCursor({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        });
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
        <div className="absolute top-0 bottom-0 -left-4 z-20 w-8">
          <div className="absolute inset-0">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-muted-foreground" />
            {Array.from({ length: 11 }).map((_, i) => {
              const topPercent = (i / 10) * 100;
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{ top: `${topPercent}%`, left: "50%", transform: "translateX(-50%)" }}
                >
                  <div className="relative z-20 w-4 h-4 bg-background border border-border rounded-full shadow-inner" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div
                      className="absolute w-6 h-1 bg-muted-foreground rounded-full shadow-sm -rotate-12"
                      style={{ left: "-8px", top: "-2px" }}
                    />
                    <div
                      className="absolute w-6 h-1 bg-foreground rounded-full shadow-sm rotate-12"
                      style={{ left: "-8px", top: "0px" }}
                    />
                    <div
                      className="absolute w-6 h-1 bg-muted-foreground rounded-full shadow-sm -rotate-12"
                      style={{ left: "-8px", top: "2px" }}
                    />
                    <div
                      className="absolute w-6 h-1 bg-muted-foreground rounded-full shadow-sm rotate-12"
                      style={{ right: "-8px", top: "-2px" }}
                    />
                    <div
                      className="absolute w-6 h-1 bg-foreground rounded-full shadow-sm -rotate-12"
                      style={{ right: "-8px", top: "0px" }}
                    />
                    <div
                      className="absolute w-6 h-1 bg-muted-foreground rounded-full shadow-sm rotate-12"
                      style={{ right: "-8px", top: "2px" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ReactSketchCanvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full rounded-lg ${isEraser ? "cursor-none" : "cursor-crosshair"}`}
          strokeWidth={isEraser ? eraserWidth : brushWidth}
          strokeColor={isEraser ? "#FFFFFF" : color}
        />
        {isEraser && cursor && (
          <div
            className="absolute rounded-full border-2 border-muted-foreground border-dashed pointer-events-none"
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
