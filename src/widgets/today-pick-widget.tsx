import { useFairyTaleByRandom } from "@/entities/fairy-tale/api/hooks";
import { FairyTaleCard } from "@/features/fairy-tale/components/variants";

export default function TodayPickWidget() {
  const { data: tales } = useFairyTaleByRandom();

  return <FairyTaleCard.Grid tales={tales} />;
}
