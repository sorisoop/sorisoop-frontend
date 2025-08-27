import { useParams } from "react-router-dom";
import { FullScreenBackHeaderLayout } from "@/shared/layouts";
import { FairyTaleReaderProvider } from "@/features/fairy-tale/providers";
import { FairyTaleReader } from "@/features/fairy-tale/components/reader";

export default function FairyTaleReaderPage() {
  const { id } = useParams<{ id: string }>();
  const fairyTaleId = id ? Number(id) : undefined;

  if (!fairyTaleId) return null;

  return (
    <FairyTaleReaderProvider id={fairyTaleId}>
      <FullScreenBackHeaderLayout rightSlot={<FairyTaleReader.ToggleTextButton />}>
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
  );
}
