import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie-player";
import { BackHeaderLayout } from "@/shared/layouts";
import { Button } from "@/shared/components/ui/button";
import completeBook from "@/lotties/complete-book.json";

export default function DrawComplete() {
  const navigate = useNavigate();

  return (
    <BackHeaderLayout title="동화 생성">
      <div className="flex h-[calc(100vh-104px)] flex-col items-center justify-center gap-6 text-center">
        <Lottie animationData={completeBook} loop play className="w-64 h-64" />
        <div>
          <h2 className="text-xl font-bold">동화를 만들고 있어요</h2>
          <p className="text-base text-muted-foreground mt-2">완성되면 알림으로 알려드릴게요!</p>
        </div>
        <Button onClick={() => navigate("/library")} className="mt-6 w-full max-w-xs h-12 text-secondary font-se">
          내 책장으로 가기
        </Button>
      </div>
    </BackHeaderLayout>
  );
}
