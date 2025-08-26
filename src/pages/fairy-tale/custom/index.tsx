import { useParams } from "react-router-dom";
import { useCustomFairyTaleDetailById, useFairyTalesByCategoryInfinite } from "@/entities/fairy-tale/api/hooks";
import { CATEGORY_MAP } from "@/shared/utils/category";
import {
  CustomFairyTaleDetailDesktop,
  CustomFairyTaleDetailMobile,
  CustomFairyTaleDetailView,
} from "@/features/fairy-tale/components/custom";

export default function CustomFairyTaleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const fairyTaleId = id ? Number(id) : undefined;
  const { data: fairyTale } = useCustomFairyTaleDetailById(fairyTaleId!);

  const categoryId = CATEGORY_MAP[fairyTale.categoryName];
  const { data: relatedTales } = useFairyTalesByCategoryInfinite(categoryId);
  const similarTales = relatedTales?.pages[0] ?? [];

  if (!fairyTale) return <div className="p-4">동화를 찾을 수 없습니다.</div>;

  return (
    <CustomFairyTaleDetailView>
      <CustomFairyTaleDetailView.isMobile>
        <CustomFairyTaleDetailMobile fairyTale={fairyTale} similarTales={similarTales} />
      </CustomFairyTaleDetailView.isMobile>

      <CustomFairyTaleDetailView.isDeskTop>
        <CustomFairyTaleDetailDesktop fairyTale={fairyTale} />
      </CustomFairyTaleDetailView.isDeskTop>
    </CustomFairyTaleDetailView>
  );
}
