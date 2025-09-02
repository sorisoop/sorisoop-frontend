import { useCustomFairyTales } from "@/entities/fairy-tale/api/hooks";
import { FairyTaleCard } from "@/features/fairy-tale/components/variants";

export default function CustomFairyTaleContent({ categoryId }: { categoryId: number }) {
  const { data: tales = [] } = useCustomFairyTales(categoryId);

  return <FairyTaleCard.Grid tales={tales} custom />;
}
