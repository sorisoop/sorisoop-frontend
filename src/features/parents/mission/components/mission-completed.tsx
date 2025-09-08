import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie-player";
import successAnimation from "@/lotties/success.json";

export default function MissionCompleted() {
  const navigate = useNavigate();

  return (
    <div className="flex h-[calc(100vh-124px)] flex-col items-center justify-center gap-6 text-center px-6">
      <Lottie animationData={successAnimation} play loop className="w-40 h-40" />
      <div>
        <h2 className="text-2xl font-bold">미션이 생성되었어요!</h2>
        <p className="text-base text-muted-foreground mt-2">등록한 미션을 확인해보세요.</p>
      </div>
      <Button
        onClick={() => navigate("/parents")}
        className="w-full max-w-xs font-semibold text-secondary cursor-pointer"
      >
        미션 목록으로 가기
      </Button>
    </div>
  );
}
