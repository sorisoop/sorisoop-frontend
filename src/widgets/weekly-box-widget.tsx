import { useFairyTaleByRandom } from "@/entities/fairy-tale/api/hooks";
import { FairyTaleCard } from "@/features/fairy-tale/components/variants";

export default function WeeklyBoxWidget() {
  const { data: tales } = useFairyTaleByRandom();

  return <FairyTaleCard.HighlightRow tales={tales} />;
}
