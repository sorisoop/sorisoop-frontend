import { useLocation, useParams } from "react-router-dom";
import { FullScreenBackHeaderLayout } from "@/shared/layouts";
import { CustomFairyTaleReaderProvider, CustomTtsProvider } from "@/features/fairy-tale/providers";
import { CustomFairyTaleReader } from "@/features/fairy-tale/components/custom/reader/with-tts";
import type { TtsResponse } from "@/entities/voice/model";

export default function CustomFairyTaleReaderPage() {
  const { id } = useParams<{ id: string }>();
  const fairyTaleId = id ? Number(id) : undefined;
  const { state } = useLocation();
  const ttsData = state?.ttsData as TtsResponse | undefined;

  if (!fairyTaleId || !ttsData) {
    return <div className="p-4">잘못된 접근입니다.</div>;
  }
  return (
    <CustomTtsProvider ttsData={ttsData}>
      <CustomFairyTaleReaderProvider id={fairyTaleId}>
        <FullScreenBackHeaderLayout
          rightSlot={
            <div className="flex gap-2">
              <CustomFairyTaleReader.ToggleTextButton />
              <CustomFairyTaleReader.ToggleAutoPlayButton />
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
      </CustomFairyTaleReaderProvider>
    </CustomTtsProvider>
  );
}
