import { BackHeaderLayout } from "@/shared/layouts";
import { useParams } from "react-router-dom";
import { Suspense } from "react";
import { FairyTaleCard } from "@/features/fairy-tale/components/variants";
import FairyTaleByCategoryContent from "./fairy-tale-by-category-content";
import { CATEGORY_REVERSE_MAP } from "@/shared/utils/category";

export default function FairyTaleByCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const categoryId = id ? Number(id) : 0;
  const categoryName = CATEGORY_REVERSE_MAP[categoryId] ?? "전체";

  return (
    <BackHeaderLayout title={categoryName}>
      <Suspense fallback={<FairyTaleCard.GridSkeleton count={12} />}>
        <FairyTaleByCategoryContent categoryId={categoryId} />
      </Suspense>
    </BackHeaderLayout>
  );
}
