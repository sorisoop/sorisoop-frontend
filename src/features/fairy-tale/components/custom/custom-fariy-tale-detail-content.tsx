import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { Play } from "lucide-react";
import { useCustomFairyTaleDetailById, useFairyTalesByCategoryInfinite } from "@/entities/fairy-tale/api/hooks";
import { CATEGORY_MAP } from "@/shared/utils/category";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { VoiceSelect } from "@/features/fairy-tale/components";
import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";
import {
  CustomFairyTaleDetailDesktop,
  CustomFairyTaleDetailMobile,
  CustomFairyTaleDetailView,
} from "@/features/fairy-tale/components/custom";

export default function CustomFairyTaleDetailContent() {
  const { id } = useParams<{ id: string }>();
  const fairyTaleId = Number(id);
  const { data: fairyTale } = useCustomFairyTaleDetailById(fairyTaleId);
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
      <DialogContent
        onInteractOutside={(e) => {
          const overlay = document.querySelector("#voice-select-overlay-pending");
          if (overlay) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          const overlay = document.querySelector("#voice-select-overlay-pending");
          if (overlay) e.preventDefault();
        }}
      >
        <DialogTitle>목소리 선택</DialogTitle>
        <DialogDescription className="sr-only">목소리를 선택해주세요</DialogDescription>
        <ErrorBoundary
          fallback={
            <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
              목소리를 불러오는 중 문제가 발생했어요.
            </div>
          }
        >
          <Suspense fallback={<Spinner />}>
            <VoiceSelect />
          </Suspense>
        </ErrorBoundary>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <CustomFairyTaleDetailView.isMobile>
        <CustomFairyTaleDetailMobile fairyTale={fairyTale} similarTales={similarTales}>
          {VoiceDialog}
        </CustomFairyTaleDetailMobile>
      </CustomFairyTaleDetailView.isMobile>

      <CustomFairyTaleDetailView.isDeskTop>
        <CustomFairyTaleDetailDesktop fairyTale={fairyTale}>{VoiceDialog}</CustomFairyTaleDetailDesktop>
      </CustomFairyTaleDetailView.isDeskTop>
    </>
  );
}
