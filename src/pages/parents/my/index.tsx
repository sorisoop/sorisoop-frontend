import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { ParentsLayout } from "@/shared/layouts/parents";
import { Mypage, MyPageProfileFallback } from "@/features/my/components";
import { SubscriptionDialog } from "@/features/subscription/components";
import { useManageCard } from "@/features/subscription/hooks";
import { SubscriptionProvider } from "@/features/subscription/providers/subscription-provider";
import { useLogout } from "@/entities/member/api/mutations";

export default function ParentsMyPage() {
  const { openSettings } = useManageCard();
  const logout = useLogout();

  return (
    <ParentsLayout>
      <Suspense fallback={<MyPageProfileFallback />}>
        <Mypage.Profile>
          <Mypage.EditDialog />
        </Mypage.Profile>
      </Suspense>

      <Mypage.SubscribeBanner>
        <SubscriptionProvider>
          <SubscriptionDialog>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-60">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              }
            >
              <SubscriptionDialog.PlanSelector />
              <SubscriptionDialog.PaymentTerms />
              <SubscriptionDialog.SubscribeButton />
            </Suspense>
          </SubscriptionDialog>
        </SubscriptionProvider>
      </Mypage.SubscribeBanner>

      <Mypage.MenuSection title="구독">
        <Mypage.MenuItem to="/subscription/manage">구독 관리</Mypage.MenuItem>
        <Mypage.MenuItem onClick={openSettings}>카드 관리</Mypage.MenuItem>
      </Mypage.MenuSection>

      <Mypage.MenuSection title=" ">
        <Mypage.MenuItem
          onClick={() =>
            logout.mutate(undefined, {
              onSuccess: () => {
                window.history.pushState(null, "", "/auth/login");
                window.history.go(0);
              },
            })
          }
        >
          로그아웃
        </Mypage.MenuItem>
        <Mypage.MenuItem to="#">회원탈퇴</Mypage.MenuItem>
      </Mypage.MenuSection>
    </ParentsLayout>
  );
}
