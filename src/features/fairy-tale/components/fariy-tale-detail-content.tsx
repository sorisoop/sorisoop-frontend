import { useParams } from "react-router-dom";
import { Play } from "lucide-react";
import { useFairyTaleDetailById, useFairyTalesByCategoryInfinite } from "@/entities/fairy-tale/api/hooks";
import { CATEGORY_MAP } from "@/shared/utils/category";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import {
  FairyTaleDetailDesktop,
  FairyTaleDetailMobile,
  FairyTaleDetailView,
  VoiceSelect,
} from "@/features/fairy-tale/components";
import { Button } from "@/shared/components/ui/button";

export default function FairyTaleDetailContent() {
  const { id } = useParams<{ id: string }>();
  const fairyTaleId = Number(id);
  const { data: fairyTale } = useFairyTaleDetailById(fairyTaleId);
  const categoryId = CATEGORY_MAP[fairyTale.categoryName];
  const { data: relatedTales } = useFairyTalesByCategoryInfinite(categoryId);
  const similarTales = relatedTales?.pages[0] ?? [];

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
    <>
      <FairyTaleDetailView.isMobile>
        <FairyTaleDetailMobile fairyTale={fairyTale} similarTales={similarTales}>
          {VoiceDialog}
        </FairyTaleDetailMobile>
      </FairyTaleDetailView.isMobile>

      <FairyTaleDetailView.isDeskTop>
        <FairyTaleDetailDesktop fairyTale={fairyTale}>{VoiceDialog}</FairyTaleDetailDesktop>
      </FairyTaleDetailView.isDeskTop>
    </>
  );
}
