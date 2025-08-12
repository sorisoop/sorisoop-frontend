import { Button } from "@/shared/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { Check, X } from "lucide-react";
import type { Plan } from "@/features/my/types";

interface SubscribePaymentDialogProps {
  selectedPlan: Plan; // "yearly" | "monthly"
  onSelectPlan: (p: Plan) => void;
}

export default function SubscribePaymentDialog({ selectedPlan, onSelectPlan }: SubscribePaymentDialogProps) {
  return (
    <DialogContent
      className={cn(
        "p-0 w-screen h-[100dvh] max-w-none rounded-none sm:h-auto sm:max-w-md sm:rounded-lg sm:p-6",
        "flex flex-col"
      )}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between h-14 px-4 border-b bg-background sm:hidden">
        <DialogTitle className="text-xl font-bold">sorisoop</DialogTitle>
        <DialogClose asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" aria-label="닫기">
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>
      </div>

      <DialogHeader className="hidden sm:block pb-4">
        <DialogTitle className="text-2xl font-bold">sorisoop</DialogTitle>
        <DialogDescription className="pt-2 text-sm font-semibold text-left text-foreground">
          우리 아이 얼굴이 담긴 특별한 동화책을 만들어보세요.
        </DialogDescription>
      </DialogHeader>

      <div className="grow overflow-y-auto px-4 sm:px-0">
        <div className="text-left mb-6 sm:hidden">
          <h2 className="text-lg font-semibold mb-2">우리 아이 얼굴이 담긴 특별한 동화책을 무한대로 만들어보세요.</h2>
        </div>

        <div className="flex flex-col space-y-3 mb-6">
          <Button
            variant="outline"
            size="lg"
            type="button"
            onClick={() => onSelectPlan("yearly")}
            className={cn(
              "grid grid-cols-[1fr_auto] items-center gap-4 w-full !h-auto !p-4",
              "rounded-lg border-2 text-left",
              selectedPlan === "yearly" ? "border-primary bg-primary/10" : "border-input hover:border-ring/60"
            )}
          >
            <span className="min-w-0 flex items-center gap-3">
              <span
                className={cn(
                  "w-5 h-5 rounded-full border-2 grid place-items-center shrink-0",
                  selectedPlan === "yearly" ? "border-primary bg-primary text-primary-foreground" : "border-input"
                )}
              >
                {selectedPlan === "yearly" && <Check className="w-3 h-3" />}
              </span>
              <span className="text-base font-medium">1년</span>
            </span>
            <span className="justify-self-end text-right flex flex-col items-end leading-none">
              <span className="text-xl font-bold whitespace-nowrap">₩35,900</span>
            </span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            type="button"
            onClick={() => onSelectPlan("monthly")}
            className={cn(
              "grid grid-cols-[1fr_auto] items-center gap-4 w-full !h-auto !p-4",
              "rounded-lg border-2 text-left",
              selectedPlan === "monthly" ? "border-primary bg-primary/10" : "border-input hover:border-ring/60"
            )}
          >
            <span className="min-w-0 flex items-center gap-3">
              <span
                className={cn(
                  "w-5 h-5 rounded-full border-2 grid place-items-center shrink-0",
                  selectedPlan === "monthly" ? "border-primary bg-primary text-primary-foreground" : "border-input"
                )}
              >
                {selectedPlan === "monthly" && <Check className="w-3 h-3" />}
              </span>
              <span className="text-base font-medium">1개월</span>
            </span>
            <span className="justify-self-end text-right flex flex-col items-end leading-none">
              <span className="text-xl font-bold whitespace-nowrap">₩9,900</span>
            </span>
          </Button>
        </div>

        <div className="text-center mb-2">
          <p className="text-sm text-muted-foreground mb-4">매년 자동 결제되며, 언제든지 해지할 수 있어요.</p>
          <div className="flex justify-center gap-4 text-sm">
            <button className="text-muted-foreground underline">유료 이용약관</button>
            <button className="text-muted-foreground underline">개인정보 처리방침</button>
            <button className="text-muted-foreground underline">구매복원</button>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t p-4 sm:static sm:bg-background sm:backdrop-blur-none sm:border-t-0 sm:pt-4 sm:pb-0">
          <Button size="lg" className="w-full h-12">
            구독하기
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
