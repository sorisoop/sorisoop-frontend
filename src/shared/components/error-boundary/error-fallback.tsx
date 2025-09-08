import Lottie from "react-lottie-player";
import errorAnimation from "@/lotties/error-boundary.json";
import { Button } from "@/shared/components/ui/button";

export default function ErrorFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background text-center overflow-hidden">
      <Lottie animationData={errorAnimation} loop play className="w-40 h-40" />
      <h2 className="text-2xl font-bold text-foreground">문제가 생겼어요!</h2>
      <p className="my-4 text-base text-muted-foreground leading-relaxed max-w-sm">일시적인 오류가 발생했습니다</p>
      <Button className="w-xs max-w-sm h-10 text-secondary font-semibold" onClick={() => (window.location.href = "/")}>
        홈으로 이동
      </Button>
    </div>
  );
}
