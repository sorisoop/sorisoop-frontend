import { subscriptionQueryOptions } from "@/entities/subscription/api/query-options";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

export default function MypageSubscribeBanner({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const prefetch = () => {
    queryClient.prefetchQuery(subscriptionQueryOptions.getSubscriptionPlans());
  };

  return (
    <Dialog>
      <section className="pt-8">
        <DialogTrigger asChild>
          <Button
            type="button"
            onMouseEnter={prefetch}
            className={cn(
              "relative w-full sm:h-56 h-40 rounded-xl overflow-hidden cursor-pointer",
              "ring-1 ring-border hover:ring-ring/50 transition"
            )}
          >
            <picture>
              <source srcSet="/assets/subscribe/subscribe-tablet.webp" media="(min-width: 768px)" />
              <img
                src="/assets/subscribe/subscribe-mobile.webp"
                alt="구독 배너"
                className="absolute inset-0 w-full h-full object-cover object-right"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <div className="relative z-10 flex items-center h-full px-4">
              <div className="text-secondary">
                <p className="text-xl font-bold">무제한으로 동화 생성</p>
                <p className="text-base font-semibold">지금 구독을 시작하세요!</p>
              </div>
            </div>
          </Button>
        </DialogTrigger>

        {children}
      </section>
    </Dialog>
  );
}
