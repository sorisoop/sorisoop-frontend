import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { formatDate } from "@/shared/lib/date";
import { useSubscriptionManageContext } from "../hooks";

export function SubscribeManageActive() {
  const { subscription } = useSubscriptionManageContext();
  if (!subscription) return null;

  return (
    <section
      className={cn(
        "bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl p-6 mt-4 border border-border/50 shadow-sm",
        "flex flex-col gap-4 sm:gap-5 sm:p-8 relative overflow-hidden"
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary/5 rounded-full translate-y-10 -translate-x-10" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded-full" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">소리숲</h2>
        </div>
        <Badge variant="destructive" className="text-xs font-semibold px-3 py-1 shadow-sm">
          구독중
        </Badge>
      </div>

      <div className="relative z-10 space-y-2">
        <p className="text-base font-base text-foreground">
          {subscription.type === "MONTH" ? "월간 플랜 이용중입니다." : "연간 플랜 이용중입니다."}
        </p>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <p className="text-sm text-muted-foreground">
            다음 결제일
            <span className="font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md ml-2">
              {formatDate(subscription.nextBillingAt)}
            </span>
          </p>
        </div>

        {subscription.cancelledAt && (
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-primary rounded-full" />
            <p className="text-sm text-muted-foreground">
              해지 예정일: <span className="font-semibold text-foreground">{subscription.cancelledAt}</span>
            </p>
          </div>
        )}
      </div>

      <Button
        variant={"default"}
        className={cn(
          "mt-3 w-full sm:w-auto font-semibold shadow-md hover:shadow-lg cursor-pointer text-secondary text-base",
          "transition-all duration-200 hover:scale-[1.02] relative z-10"
        )}
      >
        구독 해지
      </Button>
    </section>
  );
}
