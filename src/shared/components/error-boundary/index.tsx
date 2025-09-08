import Lottie from "react-lottie-player";
import errorAnimation from "@/lotties/error-boundary.json";
import { Button } from "@/shared/components/ui/button";

export default function ErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-screen-xl h-[calc(100dvh-128px)] bg-background text-center overflow-hidden">
      <Lottie animationData={errorAnimation} loop={true} className="w-48 h-48" />
      <p className="mt-4 text-sm font-semibold text-muted-foreground">문제가 발생했습니다</p>
      <Button className="max-w-sm text-secondary font-semibold" onClick={() => (window.location.href = "/")}>
        홈으로 이동
      </Button>
    </div>
  );
}
