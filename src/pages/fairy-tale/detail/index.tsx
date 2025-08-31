import { useParams } from "react-router-dom";
import {
  FairyTaleDetailDesktop,
  FairyTaleDetailMobile,
  FairyTaleDetailView,
  VoiceSelect,
} from "@/features/fairy-tale/components";
import { useFairyTaleDetailById, useFairyTalesByCategoryInfinite } from "@/entities/fairy-tale/api/hooks";
import { CATEGORY_MAP } from "@/shared/utils/category";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Play } from "lucide-react";

export default function FairyTaleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const fairyTaleId = id ? Number(id) : undefined;
  const { data: fairyTale } = useFairyTaleDetailById(fairyTaleId!);
  const categoryId = CATEGORY_MAP[fairyTale.categoryName];
  const { data: relatedTales } = useFairyTalesByCategoryInfinite(categoryId);
  const similarTales = relatedTales?.pages[0] ?? [];

  if (!fairyTale || !categoryId) return <div className="p-4">동화를 찾을 수 없습니다.</div>;

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
        <VoiceSelect />
      </DialogContent>
    </Dialog>
  );

  return (
    <FairyTaleDetailView>
      <FairyTaleDetailView.isMobile>
        <FairyTaleDetailMobile fairyTale={fairyTale} similarTales={similarTales}>
          {VoiceDialog}
        </FairyTaleDetailMobile>
      </FairyTaleDetailView.isMobile>

      <FairyTaleDetailView.isDeskTop>
        <FairyTaleDetailDesktop fairyTale={fairyTale}>{VoiceDialog}</FairyTaleDetailDesktop>
      </FairyTaleDetailView.isDeskTop>
    </FairyTaleDetailView>
  );
}
