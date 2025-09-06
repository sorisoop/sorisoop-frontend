import { useParams } from "react-router-dom";
import { FullScreenBackHeaderLayout } from "@/shared/layouts";
import { CustomFairyTaleReaderProvider, CustomTtsProvider } from "@/features/fairy-tale/providers";
import { CustomFairyTaleReader } from "@/features/fairy-tale/components/custom/reader/with-tts";

export default function CustomFairyTaleReaderPage() {
  const { id, voiceUuid } = useParams<{ id: string; voiceUuid: string }>();
  const fairyTaleId = id ? Number(id) : undefined;

  if (!fairyTaleId || !voiceUuid) return null;

  return (
    <CustomTtsProvider id={fairyTaleId} voiceUuid={voiceUuid}>
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
