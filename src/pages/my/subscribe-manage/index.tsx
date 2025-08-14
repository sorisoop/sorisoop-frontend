import BackHeaderLayout from "@/shared/layouts/back-header-layout";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/components/ui/badge";
import TitleBar from "@/shared/components/ui/title-bar";

export default function SubscribeManagePage() {
  return (
    <BackHeaderLayout title="구독 관리">
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
          <p className="text-base font-medium text-foreground">연간 플랜 이용중입니다.</p>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-primary rounded-full" />
            <p className="text-sm text-muted-foreground">
              해지 예정일: <span className="font-semibold text-foreground">2025. 08. 14</span>
            </p>
          </div>
        </div>

        <Button
          variant={"default"}
          className={cn(
            "mt-3 w-full sm:w-auto font-semibold shadow-md hover:shadow-lg cursor-pointer text-secondary text-base",
            "transition-all duration-200 hover:scale-[1.02] relative z-10"
          )}
        >
          구독 상품 보기
        </Button>
      </section>

      <section className="mt-8 space-y-4">
        <TitleBar title="이용안내" subtitle="" />

        <div className="bg-secondary/30 rounded-xl p-5 border border-border/30">
          <ul className="space-y-4 text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary/60 rounded-full mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">
                미성년자가 구매하는 경우, 법정대리인이 동의하지 않으면 구매를 취소할 수 있습니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary/60 rounded-full mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">환불 처리는 해당 앱마켓의 정책을 따릅니다.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary/60 rounded-full mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">
                회사 사유로 정상 이용이 불가할 경우, 피해에 대한 적절한 보상을 합니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary/60 rounded-full mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">구독 전 유료 이용약관 동의가 필요합니다.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary/60 rounded-full mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">
                소비자 피해 보상, 불만 처리 및 분쟁 해결을 위한 창구를 운영합니다.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </BackHeaderLayout>
  );
}
