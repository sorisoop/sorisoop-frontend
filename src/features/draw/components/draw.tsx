import { DrawFlowComplete } from "./draw-flow.complete";
import { DrawFlowDraw } from "./draw-flow.draw";
import { DrawFlowError } from "./draw-flow.error";
import { DrawFlowLoading } from "./draw-flow.loading";
import { DrawFlowResult } from "./draw-flow.result";

export const DrawFlow = {
  Draw: DrawFlowDraw,
  Loading: DrawFlowLoading,
  Result: DrawFlowResult,
  Complete: DrawFlowComplete,
  Error: DrawFlowError,
};
