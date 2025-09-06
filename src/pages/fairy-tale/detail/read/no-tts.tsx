import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { FullScreenBackHeaderLayout } from "@/shared/layouts";
import { FairyTaleReader } from "@/features/fairy-tale/components/reader/no-tts";
import { FairyTaleReaderStandaloneProvider } from "@/features/fairy-tale/providers";
import { FairyTaleReaderFallback } from "@/features/fairy-tale/components";

export default function FairyTaleReaderStandalonePage() {
  const { id } = useParams<{ id: string }>();
  const fairyTaleId = id ? Number(id) : undefined;

  return (
    <Suspense fallback={<FairyTaleReaderFallback />}>
      <FairyTaleReaderStandaloneProvider id={fairyTaleId!}>
        <FullScreenBackHeaderLayout
          rightSlot={
            <div className="flex gap-2">
              <FairyTaleReader.ToggleTextButton />
            </div>
          }
        >
          <FairyTaleReader>
            <FairyTaleReader.Book />
            <FairyTaleReader.Navigation />
            <FairyTaleReader.Indicator />
            <FairyTaleReader.Hint />
            <FairyTaleReader.Overlay />
            <FairyTaleReader.EndDialog />
          </FairyTaleReader>
        </FullScreenBackHeaderLayout>
      </FairyTaleReaderStandaloneProvider>
    </Suspense>
  );
}
