import { CommonLayout } from "@/shared/layouts";
import FavoriteFairyTaleContent from "./favorite-fairy-tale-content";
import { Suspense } from "react";
import { FairyTaleCard } from "@/features/fairy-tale/components/variants";

export default function LibraryPage() {
  return (
    <CommonLayout title="내 책장">
      <Suspense fallback={<FairyTaleCard.GridSkeleton />}>
        <FavoriteFairyTaleContent />
      </Suspense>
    </CommonLayout>
  );
}
