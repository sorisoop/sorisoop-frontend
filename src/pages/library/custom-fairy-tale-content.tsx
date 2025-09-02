import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import { useCustomFairyTales } from "@/entities/fairy-tale/api/hooks";
import { FairyTaleCard } from "@/features/fairy-tale/components/variants";
import { Button } from "@/shared/components/ui/button";
import paintBrush from "@/lotties/paint-brush.json";

export default function CustomFairyTaleContent({ categoryId }: { categoryId: number }) {
  const { data: tales = [] } = useCustomFairyTales(categoryId);

  if (tales.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-213px)] text-center">
        <Lottie animationData={paintBrush} play loop className="w-32 h-32 mb-4" />
        <h2 className="text-lg font-bold">아직 만든 동화책이 없어요</h2>
        <p className="text-muted-foreground mt-1">세상에 단 하나뿐인 동화를 만들어 보세요!</p>
        <Button asChild size="sm" className="mt-4 text-secondary font-semibold">
          <Link to="/draw">동화 만들러 가기</Link>
        </Button>
      </div>
    );
  }

  return <FairyTaleCard.Grid tales={tales} custom />;
}
