import { useParams } from "react-router-dom";
import { FairyTaleDetailDesktop, FairyTaleDetailMobile, FairyTaleDetailView } from "@/features/fairy-tale/components";
import { useFairyTaleDetailById, useFairyTalesByCategoryInfinite } from "@/entities/fairy-tale/api/hooks";
import { CATEGORY_MAP } from "@/shared/utils/category";

export default function FairyTaleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: fairyTale } = useFairyTaleDetailById(id!);
  const categoryId = CATEGORY_MAP[fairyTale.categoryName];
  const { data: relatedTales } = useFairyTalesByCategoryInfinite(categoryId);
  const similarTales = relatedTales?.pages[0] ?? [];

  if (!fairyTale) {
    return <div className="p-4">동화를 찾을 수 없습니다.</div>;
  }

  return (
    <FairyTaleDetailView>
      <FairyTaleDetailView.isMobile>
        <FairyTaleDetailMobile fairyTale={fairyTale} similarTales={similarTales} />
      </FairyTaleDetailView.isMobile>

      <FairyTaleDetailView.isDeskTop>
        <FairyTaleDetailDesktop fairyTale={fairyTale} />
      </FairyTaleDetailView.isDeskTop>
    </FairyTaleDetailView>
  );
}
