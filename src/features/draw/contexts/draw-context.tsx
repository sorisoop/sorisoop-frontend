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
  stencil: string | null;
  setStencil: (s: string | null) => void;
  enablePen: () => void;
  enableEraser: () => void;
}

export const DrawContext = createContext<DrawContextValue | null>(null);
