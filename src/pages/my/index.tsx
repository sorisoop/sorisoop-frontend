import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import CommonLayout from "@/shared/layouts/common-layout";

import SubscribePaymentDialog from "@/features/my/components/subscribe-payment-dialog";

const supportMenus = ["알림 설정", "고객센터", "약관 및 정책"];
const accountMenus = ["로그아웃", "회원탈퇴"];
const profile = {
  name: "하하",
  gender: "남자",
  ageRange: "7~10세",
  avatar: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop",
};

export default function MyPage() {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly">("yearly");

  return (
    <CommonLayout title="">
      <section className="pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={profile.avatar} alt="프로필 이미지" className="w-14 h-14 rounded-full object-cover" />
            <div className="flex flex-col">
              <p className="text-lg font-bold">{profile.name}</p>
              <p className="text-sm text-muted-foreground">
                {profile.gender} · {profile.ageRange}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="text-sm cursor-pointer">
            프로필 변경
          </Button>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <section className="pt-8">
          <DialogTrigger asChild>
            <Button
              type="button"
              className={cn(
                "relative w-full sm:h-56 h-40 rounded-xl overflow-hidden cursor-pointer",
                "ring-1 ring-border hover:ring-ring/50 transition",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
              aria-label="구독 배너 열기"
            >
              <picture>
                <source srcSet="/assets/subscribe/subscribe-tablet.png" media="(min-width: 768px)" />
                <img
                  src="/assets/subscribe/subscribe-mobile.png"
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
          <SubscribePaymentDialog selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />
        </section>
      </Dialog>

      <section className="pt-8">
        <div className="border-b border-border pb-2">
          <p className="text-base text-muted-foreground">구독</p>
        </div>
        <Link to="#" className="flex justify-between items-center pt-4">
          <span className="text-lg font-medium">구독 관리</span>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
      </section>

      <section className="pt-8">
        <div className="border-b border-border pb-2">
          <p className="text-base text-muted-foreground">고객지원</p>
        </div>
        <div className="flex flex-col gap-6 pt-4">
          {supportMenus.map((label) => (
            <Link to="#" key={label} className="flex justify-between items-center">
              <span className="text-lg font-medium">{label}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>

      <section className="pt-8">
        <div className="border-b border-border pb-2"></div>
        <div className="flex flex-col gap-6 pt-4">
          {accountMenus.map((label) => (
            <Link to="#" key={label} className="flex justify-between items-center">
              <span className="text-lg font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </section>
    </CommonLayout>
  );
}
