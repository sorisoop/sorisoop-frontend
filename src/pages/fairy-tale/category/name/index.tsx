import { BackHeaderLayout } from "@/shared/layouts";
import { useParams } from "react-router-dom";
import { Suspense } from "react";
import { FairyTaleCard } from "@/features/fairy-tale/components/variants";
import FairyTaleByCategoryContent from "./fairy-tale-by-category-content";

export default function FairyTaleByCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const categoryId = id ? Number(id) : 0;

  return (
    <BackHeaderLayout title="카테고리별 동화">
      <Suspense fallback={<FairyTaleCard.GridSkeleton count={12} />}>
        <FairyTaleByCategoryContent categoryId={categoryId} />
      </Suspense>
    </BackHeaderLayout>
  );
}
