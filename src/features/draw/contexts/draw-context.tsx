import { createContext, type RefObject } from "react";
import type { ReactSketchCanvasRef } from "react-sketch-canvas";

export interface DrawContextValue {
  color: string;
  setColor: (c: string) => void;
  isEraser: boolean;
  setIsEraser: (v: boolean) => void;
  brushWidth: number;
  setBrushWidth: (n: number) => void;
  eraserWidth: number;
  setEraserWidth: (n: number) => void;
  canvasRef: RefObject<ReactSketchCanvasRef | null>;
}

export const DrawContext = createContext<DrawContextValue | null>(null);
