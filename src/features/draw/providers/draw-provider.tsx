import { useRef, useState } from "react";
import type { ReactSketchCanvasRef } from "react-sketch-canvas";
import { DrawContext } from "../contexts/draw-context";

export function DrawProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState("#000000");
  const [isEraser, setIsEraser] = useState(false);
  const [brushWidth, setBrushWidth] = useState(10);
  const [eraserWidth, setEraserWidth] = useState(12);
  const [stencil, setStencil] = useState<string | null>(null);

  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const enablePen = () => {
    setIsEraser(false);
    canvasRef.current?.eraseMode(false);
  };

  const enableEraser = () => {
    setIsEraser(true);
    canvasRef.current?.eraseMode(true);
  };

  return (
    <DrawContext.Provider
      value={{
        color,
        setColor,
        isEraser,
        setIsEraser,
        brushWidth,
        setBrushWidth,
        eraserWidth,
        setEraserWidth,
        canvasRef,
        stencil,
        setStencil,
        enablePen,
        enableEraser,
      }}
    >
      {children}
    </DrawContext.Provider>
  );
}
