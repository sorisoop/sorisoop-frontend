import { useFairyTalesByCategoryInfinite } from "@/entities/fairy-tale/api/hooks";
import { FairyTaleCard } from "@/features/fairy-tale/components/variants";

export default function TodayPickWidget() {
  const { data } = useFairyTalesByCategoryInfinite(1);
  const tales = data?.pages[0] ?? [];

  return <FairyTaleCard.Grid tales={tales} />;
}
