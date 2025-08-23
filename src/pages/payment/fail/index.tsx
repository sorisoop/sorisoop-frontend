import Lottie from "react-lottie-player";
import failCardAnimation from "@/lotties/credit-card-fail.json";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function PaymentFailPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background px-4 max-w-screen-lg w-full">
      <Lottie animationData={failCardAnimation} loop={false} play className="w-64 h-64" />

      <h1 className="mt-6 text-2xl font-bold text-destructive">결제가 실패했습니다</h1>
      <p className="mt-2 text-muted-foreground text-center">
        카드 승인에 실패했거나 네트워크 오류가 발생했어요. <br />
        다시 시도해주세요.
      </p>

      <div className="mt-8 flex gap-4">
        <Button
          onClick={() => navigate("/", { replace: true })}
          className="text-secondary font-semibold cursor-pointer"
        >
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
