import Lottie from "react-lottie-player";
import bookLoading from "@/lotties/book-loading.json";
import { BackHeaderLayout } from "@/shared/layouts";

export default function DrawLoading() {
  return (
    <BackHeaderLayout title="시놉시스 생성 중...">
      <div className="flex h-[calc(100vh-104px)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Lottie animationData={bookLoading} loop play className="w-64 h-64" />
          <p className="text-base text-muted-foreground">그림을 바탕으로 테마를 만들고 있어요!</p>
        </div>
      </div>
    </BackHeaderLayout>
  );
}
