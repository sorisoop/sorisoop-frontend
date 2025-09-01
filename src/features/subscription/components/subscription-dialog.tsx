import type { ReactNode } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { X } from "lucide-react";
import SubscriptionDialogPlanSelector from "./subscription-dialog.plan-selector";
import SubscriptionDialogPaymentTerms from "./subscription-dialog.payment.terms";
import SubscriptionDialogPaymentSubscribeButton from "./subscription-dialog.payment.subscribe-button";

function SubscriptionDialog({ children }: { children: ReactNode }) {
  return (
    <DialogContent
      className={cn(
        "p-0 w-screen h-dvh max-w-none rounded-none sm:h-auto sm:max-w-md sm:rounded-lg sm:p-6 border-none",
        "flex flex-col pt-[env(safe-area-inset-top)] [&>button]:hidden"
      )}
    >
      <div className="absolute inset-0 bg-[url('/assets/subscribe/subscription-bg.webp')] bg-cover bg-center -z-10" />
      <div className="absolute inset-0 bg-black/50 -z-10" />

      <div className="sticky top-0 z-10 flex items-center justify-end h-14 px-4 sm:hidden">
        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 cursor-pointer text-secondary hover:bg-foreground/10"
            aria-label="닫기"
          >
            <X className="!h-6 !w-6 text-secondary" />
          </Button>
        </DialogClose>
      </div>

      <DialogHeader className="hidden sm:block pb-4">
        <DialogTitle className="text-2xl font-bold text-secondary">소리숲</DialogTitle>
        <DialogDescription className="pt-2 text-sm font-semibold text-left text-secondary">
          우리 아이 그림이 담긴 특별한 동화책을 만들어보세요.
        </DialogDescription>
      </DialogHeader>

      {/* 본문 */}
      <div className="grow flex flex-col justify-end px-4 sm:px-0 sm:justify-start sm:overflow-y-auto">
        <div className="text-left mb-6 sm:hidden">
          <h2 className="text-secondary text-2xl font-semibold mb-2">소리숲 </h2>
          <h2 className="text-secondary text-xl font-semibold mb-2">
            우리 아이 그림이 담긴 특별한 동화책을 만들어보세요.
          </h2>
        </div>

        {/* 콘텐츠 카드 */}
        <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8 sm:mb-0">{children}</div>
      </div>
    </DialogContent>
  );
}

SubscriptionDialog.PlanSelector = SubscriptionDialogPlanSelector;
SubscriptionDialog.PaymentTerms = SubscriptionDialogPaymentTerms;
SubscriptionDialog.SubscribeButton = SubscriptionDialogPaymentSubscribeButton;

export default SubscriptionDialog;
