import { Button } from "@/shared/components/ui/button";
import { BackHeaderLayout } from "@/shared/layouts";
import { AlertTriangle } from "lucide-react";

export default function DrawError() {
  return (
    <BackHeaderLayout title="분석 실패">
      <div className="flex flex-col items-center justify-center gap-6 h-[calc(100vh-104px)] px-6 text-center">
        <div className="bg-destructive/10 rounded-full p-6">
          <AlertTriangle className="w-12 h-12 text-destructive" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">데이터를 불러올 수 없습니다</h2>
          <p className="text-muted-fowreground text-sm">
            분석 과정에서 오류가 발생했어요. <br />
            잠시 후 다시 시도해주세요.
          </p>
        </div>

        <Button
          onClick={() => window.location.reload()}
          variant="default"
          size="lg"
          className="cursor-pointer w-full max-w-xs"
        >
          다시 시도하기
        </Button>
      </div>
    </BackHeaderLayout>
  );
}
