import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import { Mypage, MyPageProfileFallback } from "@/features/my/components";
import { SubscriptionDialog } from "@/features/subscription/components";
import { useManageCard } from "@/features/subscription/hooks";
import { SubscriptionProvider } from "@/features/subscription/providers/subscription-provider";
import { useLogout } from "@/entities/member/api/mutations";
import { ErrorFallback } from "@/shared/components/error-boundary";

export default function MypageScreen() {
  const { openSettings } = useManageCard();
  const logout = useLogout();

  return (
    <Mypage>
      <ErrorBoundary fallback={<ErrorFallback />}>
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

        <Mypage.MenuSection title="미션">
          <Mypage.MenuItem to="/missions">미션 관리</Mypage.MenuItem>
        </Mypage.MenuSection>

        <Mypage.MenuSection title="구독">
          <Mypage.MenuItem to="/subscription/manage">구독 관리</Mypage.MenuItem>
          <Mypage.MenuItem onClick={openSettings}>카드 관리</Mypage.MenuItem>
        </Mypage.MenuSection>

        <Mypage.MenuSection title="고객지원">
          <Mypage.MenuItem to="/settings/notification">알림 설정</Mypage.MenuItem>
          <Mypage.MenuItem to="#">고객센터</Mypage.MenuItem>
          <Mypage.MenuItem to="#">약관 및 정책</Mypage.MenuItem>
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
      </ErrorBoundary>
    </Mypage>
  );
}
