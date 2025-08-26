import { BackHeaderLayout } from "@/shared/layouts";
import { DrawCanvas, DrawToolbar } from ".";
import { useDraw, useDrawFlow } from "../hooks";
import { useCreateCustomSynopsis } from "@/entities/fairy-tale/api/mutations";
import { SubscriptionApiError } from "@/shared/lib/api/errors";

export default function DrawContent() {
  const { canvasRef } = useDraw();
  const { mutateAsync: createSynopsis } = useCreateCustomSynopsis();
  const { setStep, setResult } = useDrawFlow();

  const handleNext = async () => {
    const base64 = await canvasRef.current?.exportImage("png");
    if (!base64) {
      setStep("draw");
      return;
    }

    const blob = await (await fetch(base64)).blob();
    setStep("loading");

    try {
      const data = await createSynopsis(blob);
      setResult(data);
      setStep("result");
    } catch (err) {
      if (err instanceof SubscriptionApiError) {
        if (err.code === "SU013") {
          setStep("subscription-required");
        } else {
          setStep("error");
        }
      }
    }
  };

  return (
    <BackHeaderLayout title="그림 그리기" rightButtonLabel="다음" onRightButtonClick={handleNext}>
      <div className="h-[calc(100vh-104px)] py-4 flex flex-col lg:flex-row gap-4">
        <DrawToolbar.Root className="lg:hidden flex-wrap justify-start px-4">
          <DrawToolbar.Color />
          <DrawToolbar.Brush />
          <DrawToolbar.Eraser />
          <DrawToolbar.Clear />
        </DrawToolbar.Root>

        <DrawCanvas />

        <DrawToolbar.Root className="hidden lg:flex flex-col w-20 items-center py-4">
          <DrawToolbar.Color />
          <DrawToolbar.Brush />
          <DrawToolbar.Eraser />
          <DrawToolbar.Clear />
        </DrawToolbar.Root>
      </div>
    </BackHeaderLayout>
  );
}
