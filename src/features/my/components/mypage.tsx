import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import CommonLayout from "@/shared/layouts/common-layout";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { subscriptionQueryOptions } from "@/entities/subscription/api/query-options";

function MypageRoot({ children }: { children: React.ReactNode }) {
  return <CommonLayout title="">{children}</CommonLayout>;
}

function Profile({
  name,
  gender,
  ageRange,
  avatar,
  onEditProfile,
}: {
  name: string;
  gender: string;
  ageRange: string;
  avatar: string;
  onEditProfile?: () => void;
}) {
  return (
    <section className="pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={avatar} alt="프로필 이미지" className="w-14 h-14 rounded-full object-cover" />
          <div className="flex flex-col">
            <p className="text-lg font-bold">{name}</p>
            <p className="text-sm text-muted-foreground">
              {gender} · {ageRange}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="text-sm" onClick={onEditProfile}>
          프로필 변경
        </Button>
      </div>
    </section>
  );
}

function SubscribeBanner({ children }: { children: React.ReactNode }) {
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

        {/* 외부에서 주입한 DialogContent */}
        {children}
      </section>
    </Dialog>
  );
}

function MenuSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="pt-8">
      {title && (
        <div className="border-b border-border pb-2">
          <p className="text-base text-muted-foreground">{title}</p>
        </div>
      )}
      <div className="flex flex-col gap-6 pt-2">{children}</div>
    </section>
  );
}

/**
 * MenuItem - Link 또는 Button 모두 지원
 */
function MenuItem({ to, onClick, children }: { to?: string; onClick?: () => void; children: React.ReactNode }) {
  const content = (
    <>
      <span className="text-lg font-medium">{children}</span>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </>
  );

  if (to) {
    return (
      <Link to={to} className="flex justify-between items-center">
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex justify-between items-center w-full text-left cursor-pointer"
    >
      {content}
    </button>
  );
}

export const Mypage = Object.assign(MypageRoot, {
  Profile,
  SubscribeBanner,
  MenuSection,
  MenuItem,
});

export default Mypage;
