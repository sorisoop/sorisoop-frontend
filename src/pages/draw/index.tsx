import { DrawContent, DrawLoading, DrawResult } from "@/features/draw/components";
import { DrawFlow } from "@/features/draw/components/draw";
import { DrawFlowProvider, DrawProvider } from "@/features/draw/providers";

export default function DrawPage() {
  return (
    <DrawProvider>
      <DrawFlowProvider>
        <DrawFlow.Draw>
          <DrawContent />
        </DrawFlow.Draw>
        <DrawFlow.Loading>
          <DrawLoading />
        </DrawFlow.Loading>
        <DrawFlow.Result>
          <DrawResult />
        </DrawFlow.Result>
      </DrawFlowProvider>
    </DrawProvider>
  );
}
