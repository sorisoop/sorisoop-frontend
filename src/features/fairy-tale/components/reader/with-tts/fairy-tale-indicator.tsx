import { Card } from "@/shared/components/ui/card";
import { useFairyTaleReaderContext, useTtsContext } from "@/features/fairy-tale/hooks";

export function FairyTaleIndicator() {
  const { currentPage } = useTtsContext();
  const { data } = useFairyTaleReaderContext();

  if (!data || data.length === 0) return null;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
      <Card className="px-3 py-1 bg-card/90 backdrop-blur-sm border border-border">
        <span className="text-sm font-medium text-foreground">
          {currentPage + 1} / {data.length}
        </span>
      </Card>
    </div>
  );
}
