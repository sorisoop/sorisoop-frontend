import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { FullScreenBackHeaderLayout } from "@/shared/layouts";
import { CustomFairyTaleReaderStandaloneProvider } from "@/features/fairy-tale/providers";
import { FairyTaleReaderFallback } from "@/features/fairy-tale/components";
import { CustomFairyTaleReader } from "@/features/fairy-tale/components/custom/reader/no-tts";

export default function CustomFairyTaleReaderStandalonePage() {
  const { id } = useParams<{ id: string }>();
  const fairyTaleId = id ? Number(id) : undefined;

  return (
    <Suspense fallback={<FairyTaleReaderFallback />}>
      <CustomFairyTaleReaderStandaloneProvider id={fairyTaleId!}>
        <FullScreenBackHeaderLayout
          rightSlot={
            <div className="flex gap-2">
              <CustomFairyTaleReader.ToggleTextButton />
            </div>
          }
        >
          <CustomFairyTaleReader>
            <CustomFairyTaleReader.Book />
            <CustomFairyTaleReader.Navigation />
            <CustomFairyTaleReader.Indicator />
            <CustomFairyTaleReader.Hint />
            <CustomFairyTaleReader.Overlay />
            <CustomFairyTaleReader.EndDialog />
          </CustomFairyTaleReader>
        </FullScreenBackHeaderLayout>
      </CustomFairyTaleReaderStandaloneProvider>
    </Suspense>
  );
}
