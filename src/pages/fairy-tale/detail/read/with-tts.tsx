import { useParams } from "react-router-dom";
import { FullScreenBackHeaderLayout } from "@/shared/layouts";
import { FairyTaleReaderProvider, TtsProvider } from "@/features/fairy-tale/providers";
import { FairyTaleReader } from "@/features/fairy-tale/components/reader/with-tts";

export default function FairyTaleReaderPage() {
  const { id, voiceUuid } = useParams<{ id: string; voiceUuid: string }>();
  const fairyTaleId = id ? Number(id) : undefined;

  if (!fairyTaleId || !voiceUuid) {
    return <div className="p-4">잘못된 접근입니다.</div>;
  }

  return (
    <TtsProvider id={fairyTaleId} voiceUuid={voiceUuid}>
      <FairyTaleReaderProvider id={fairyTaleId}>
        <FullScreenBackHeaderLayout
          rightSlot={
            <div className="flex gap-2">
              <FairyTaleReader.ToggleTextButton />
              <FairyTaleReader.ToggleAutoPlayButton />
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
      </FairyTaleReaderProvider>
    </TtsProvider>
  );
}
