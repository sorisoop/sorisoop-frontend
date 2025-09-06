import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie-player";
import errorAnimation from "@/lotties/fail.json";

export default function MissionError() {
  const navigate = useNavigate();

  return (
    <div className="flex h-[calc(100vh-124px)] flex-col items-center justify-center gap-6 text-center px-6">
      <Lottie animationData={errorAnimation} play loop className="w-32 h-32" />

      <div>
        <h2 className="text-xl font-bold text-foreground">미션 생성에 실패했어요</h2>
        <p className="text-base text-muted-foreground mt-2">잠시 후 다시 시도하거나 처음으로 돌아가 주세요.</p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button variant="outline" onClick={() => window.location.reload()} className="font-semibold cursor-pointer">
          다시 시도하기
        </Button>
        <Button onClick={() => navigate("/missions")} className="font-semibold text-secondary cursor-pointer">
          미션 목록으로 가기
        </Button>
      </div>
    </div>
  );
}
