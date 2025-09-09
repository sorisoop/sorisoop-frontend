import { useLocation, useParams } from "react-router-dom";
import { FullScreenBackHeaderLayout } from "@/shared/layouts";
import { CustomFairyTaleReaderProvider, CustomTtsProvider } from "@/features/fairy-tale/providers";
import { CustomFairyTaleReader } from "@/features/fairy-tale/components/custom/reader/with-tts";

export default function CustomFairyTaleReaderPage() {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const customFairyTaleId = id ? Number(id) : undefined;
  const speakerId = state?.speakerId as string | undefined;

  if (!customFairyTaleId || !speakerId) {
    return <div className="p-4">잘못된 접근입니다.</div>;
  }

  return (
    <CustomTtsProvider speakerId={speakerId} customFairyTaleId={customFairyTaleId}>
      <CustomFairyTaleReaderProvider id={customFairyTaleId}>
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
