import { DrawContent, DrawLoading, DrawResult } from "@/features/draw/components";
import { DrawFlow } from "@/features/draw/components/draw";
import { DrawFlowTransition } from "@/features/draw/components/draw-flow-transition";
import { DrawFlowProvider, DrawProvider } from "@/features/draw/providers";

export default function DrawPage() {
  return (
    <DrawProvider>
      <DrawFlowProvider>
        <DrawFlowTransition>
          <DrawFlow.Draw>
            <DrawContent />
          </DrawFlow.Draw>
          <DrawFlow.Loading>
            <DrawLoading />
          </DrawFlow.Loading>
          <DrawFlow.Result>
            <DrawResult />
          </DrawFlow.Result>
        </DrawFlowTransition>
      </DrawFlowProvider>
    </DrawProvider>
  );
}
