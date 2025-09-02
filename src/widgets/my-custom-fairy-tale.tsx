import { useCustomFairyTales } from "@/entities/fairy-tale/api/hooks";
import { FairyTaleCard } from "@/features/fairy-tale/components/variants";

export default function MyCustomFairyTale() {
  const { data: tales = [] } = useCustomFairyTales(0);

  return <FairyTaleCard.Grid tales={tales} custom />;
}
