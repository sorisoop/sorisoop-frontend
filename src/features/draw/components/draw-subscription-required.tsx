import { Button } from "@/shared/components/ui/button";
import { BackHeaderLayout } from "@/shared/layouts";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DrawSubscriptionRequired() {
  const navigate = useNavigate();

  return (
    <BackHeaderLayout title="구독">
      <div className="flex flex-col items-center justify-center gap-6 h-[calc(100vh-104px)] px-6 text-center">
        <div className="bg-destructive/10 rounded-full p-6">
          <AlertTriangle className="w-12 h-12 text-destructive" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">구독이 필요한 기능이에요</h2>
          <p className="text-muted-foreground text-sm">
            이 기능은 구독 회원만 이용할 수 있습니다. <br />
            구독을 진행하고 모든 기능을 사용해보세요.
          </p>
        </div>

        <Button
          onClick={() => navigate("/subscription/manage", { replace: true })}
          variant="default"
          size="lg"
          className="cursor-pointer w-full max-w-xs text-secondary font-semibold"
        >
          구독하러 가기
        </Button>
      </div>
    </BackHeaderLayout>
  );
}
