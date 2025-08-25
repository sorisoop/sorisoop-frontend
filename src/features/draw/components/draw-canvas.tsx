import { ReactSketchCanvas } from "react-sketch-canvas";
import { useState } from "react";
import { useDraw } from "../hooks/use-draw";

export default function DrawCanvas() {
  const { color, isEraser, brushWidth, eraserWidth, canvasRef } = useDraw();

  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      className="flex-1 min-h-0 relative"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursor({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      onMouseLeave={() => setCursor(null)}
    >
      <ReactSketchCanvas
        ref={canvasRef}
        className={`w-full h-full rounded-lg !border-4 !border-muted-foreground !border-dotted bg-white ${
          isEraser ? "cursor-none" : "cursor-crosshair"
        }`}
        strokeWidth={isEraser ? eraserWidth : brushWidth}
        strokeColor={isEraser ? "#FFFFFF" : color}
      />

      {isEraser && cursor && (
        <div
          className="absolute rounded-full border-2 border-muted-foreground border-dashed pointer-events-none"
          style={{
            left: cursor.x - eraserWidth / 2,
            top: cursor.y - eraserWidth / 2,
            width: eraserWidth,
            height: eraserWidth,
          }}
        />
      )}
    </div>
  );
}
