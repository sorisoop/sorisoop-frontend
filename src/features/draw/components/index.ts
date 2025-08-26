export { default as DrawCanvas } from "./draw-canvas";
export { default as DrawContent } from "./draw-content";
export { default as DrawLoading } from "./draw-loading";
export { default as DrawResult } from "./draw-result";
export { default as DrawComplete } from "./draw-complete";
export { default as DrawError } from "./draw-error";

import { DrawToolbarRoot } from "./draw-toolbar.root";
import { DrawToolbarColor } from "./draw-toolbar.color";
import { DrawToolbarBrush } from "./draw-toolbar.brush";
import { DrawToolbarEraser } from "./draw-toolbar.eraser";
import { DrawToolbarClear } from "./draw-toolbar.clear";

export const DrawToolbar = {
  Root: DrawToolbarRoot,
  Color: DrawToolbarColor,
  Brush: DrawToolbarBrush,
  Eraser: DrawToolbarEraser,
  Clear: DrawToolbarClear,
};
