import { useParams } from "react-router-dom";
import { Play } from "lucide-react";
import { useCustomFairyTaleDetailById, useFairyTalesByCategoryInfinite } from "@/entities/fairy-tale/api/hooks";
import {
  CustomFairyTaleDetailDesktop,
  CustomFairyTaleDetailMobile,
  CustomFairyTaleDetailView,
} from "@/features/fairy-tale/components/custom";
import { VoiceSelect } from "@/features/fairy-tale/components";
import { CATEGORY_MAP } from "@/shared/utils/category";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";

export default function CustomFairyTaleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const fairyTaleId = id ? Number(id) : undefined;
  const { data: fairyTale } = useCustomFairyTaleDetailById(fairyTaleId!);
  const categoryId = CATEGORY_MAP[fairyTale.categoryName];
  const { data: relatedTales } = useFairyTalesByCategoryInfinite(categoryId);
  const similarTales = relatedTales?.pages[0] ?? [];

  if (!fairyTale) return <div className="p-4">동화를 찾을 수 없습니다.</div>;

  const VoiceDialog = (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full h-12 text-secondary text-base font-semibold gap-2 cursor-pointer shadow-lg">
          <Play className="w-5 h-5" />
          보기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>목소리 선택</DialogTitle>
        <DialogDescription className="sr-only">목소리를 선택해주세요</DialogDescription>
        <VoiceSelect mode="custom" />
      </DialogContent>
    </Dialog>
  );

  return (
    <CustomFairyTaleDetailView>
      <CustomFairyTaleDetailView.isMobile>
        <CustomFairyTaleDetailMobile fairyTale={fairyTale} similarTales={similarTales}>
          {VoiceDialog}
        </CustomFairyTaleDetailMobile>
      </CustomFairyTaleDetailView.isMobile>

      <CustomFairyTaleDetailView.isDeskTop>
        <CustomFairyTaleDetailDesktop fairyTale={fairyTale}>{VoiceDialog}</CustomFairyTaleDetailDesktop>
      </CustomFairyTaleDetailView.isDeskTop>
    </CustomFairyTaleDetailView>
  );
}
