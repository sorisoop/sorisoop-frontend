import { useParams } from "react-router-dom";
import { FullScreenBackHeaderLayout } from "@/shared/layouts";
import { CustomFairyTaleReaderProvider } from "@/features/fairy-tale/providers";
import { CustomFairyTaleReader } from "@/features/fairy-tale/components/custom/reader";

export default function CustomFairyTaleReaderPage() {
  const { id } = useParams<{ id: string }>();
  const fairyTaleId = id ? Number(id) : undefined;

  if (!fairyTaleId) return null;

  return (
    <FullScreenBackHeaderLayout>
      <CustomFairyTaleReaderProvider id={fairyTaleId}>
        <CustomFairyTaleReader>
          <CustomFairyTaleReader.Book />
          <CustomFairyTaleReader.Navigation />
          <CustomFairyTaleReader.Indicator />
          <CustomFairyTaleReader.Hint />
          <CustomFairyTaleReader.Overlay />
          <CustomFairyTaleReader.ToggleTextButton />
          <CustomFairyTaleReader.EndDialog />
        </CustomFairyTaleReader>
      </CustomFairyTaleReaderProvider>
    </FullScreenBackHeaderLayout>
  );
}
