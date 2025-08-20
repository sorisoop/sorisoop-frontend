import type { ReactNode } from "react";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

import SubscriptionDialogPlanSelector from "./subscription-dialog.plan-selector";
import SubscriptionDialogPaymentTerms from "./subscription-dialog.payment.terms";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { X } from "lucide-react";
import SubscriptionDialogPaymentSubscribeButton from "./subscription-dialog.payment.subscribe-button";

function SubscriptionDialog({ children }: { children: ReactNode }) {
  return (
    <DialogContent
      className={cn(
        "p-0 w-screen h-[100dvh] max-w-none rounded-none sm:h-auto sm:max-w-md sm:rounded-lg sm:p-6",
        "flex flex-col"
      )}
    >
      <div className="sticky top-0 z-10 flex items-center justify-end h-14 px-4 border-b bg-background sm:hidden">
        <DialogTitle className="text-xl font-bold sr-only">소리숲</DialogTitle>
        <DialogClose asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" aria-label="닫기">
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>
      </div>

      <DialogHeader className="hidden sm:block pb-4">
        <DialogTitle className="text-2xl font-bold">소리숲</DialogTitle>
        <DialogDescription className="pt-2 text-sm font-semibold text-left text-foreground">
          우리 아이 그림이 담긴 특별한 동화책을 만들어보세요.
        </DialogDescription>
      </DialogHeader>
      <div className="grow overflow-y-auto px-4 sm:px-0">
        <div className="text-left mb-6 sm:hidden">
          <h2 className="text-foreground text-base font-semibold mb-2">
            우리 아이 그림이 담긴 특별한 동화책을 만들어보세요.
          </h2>
        </div>
        {children}
      </div>
    </DialogContent>
  );
}

SubscriptionDialog.PlanSelector = SubscriptionDialogPlanSelector;
SubscriptionDialog.PaymentTerms = SubscriptionDialogPaymentTerms;
SubscriptionDialog.SubscribeButton = SubscriptionDialogPaymentSubscribeButton;

export default SubscriptionDialog;
