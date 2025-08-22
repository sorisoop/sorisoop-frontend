import { useParams } from "react-router-dom";
import { FairyTaleReaderProvider } from "@/features/fairy-tale/providers";
import { FullScreenBackHeaderLayout } from "@/shared/layouts";
import { FairyTaleReader } from "@/features/fairy-tale/components/reader";

export default function FairyTaleReaderPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <FullScreenBackHeaderLayout>
      <FairyTaleReaderProvider id={id}>
        <FairyTaleReader>
          <FairyTaleReader.Page />
          <FairyTaleReader.Navigation />
          <FairyTaleReader.Indicator />
          <FairyTaleReader.Hint />
          <FairyTaleReader.Overlay />
        </FairyTaleReader>
      </FairyTaleReaderProvider>
    </FullScreenBackHeaderLayout>
  );
}
