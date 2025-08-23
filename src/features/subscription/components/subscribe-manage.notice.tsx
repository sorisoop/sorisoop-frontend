import { TitleBar } from "@/widgets";

export function SubscribeManageNotice() {
  return (
    <section className="mt-8 space-y-4">
      <TitleBar title="이용안내" subtitle="" />
      <div className="bg-secondary/30 rounded-xl p-5 border border-border/30">
        <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <li>미성년자가 구매하는 경우, 법정대리인의 동의가 필요합니다.</li>
          <li>환불 처리는 해당 앱마켓의 정책을 따릅니다.</li>
          <li>회사 사유로 정상 이용이 불가할 경우 적절한 보상을 합니다.</li>
          <li>구독 전 유료 이용약관 동의가 필요합니다.</li>
          <li>소비자 피해 보상 및 분쟁 해결을 위한 창구를 운영합니다.</li>
        </ul>
      </div>
    </section>
  );
}
