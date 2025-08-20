import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { useSubscriptionManageContext } from "../hooks";

export function SubscribeManageEmpty() {
  const { subscription } = useSubscriptionManageContext();
  if (subscription) return null;

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
        <div></div>
      </div>
      <div className="relative z-10 space-y-2">
        <p className="text-base font-base text-muted-foreground">지금 바로 시작하고 더 많은 혜택을 누려보세요.</p>
      </div>

      <Button
        variant={"default"}
        className={cn(
          "relative z-10 mt-2 w-full sm:w-auto font-semibold shadow-md hover:shadow-lg cursor-pointer text-secondary text-base",
          "transition-all duration-200 hover:scale-[1.02]"
        )}
      >
        구독 시작하기
      </Button>
    </section>
  );
}
