import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Mypage } from "@/features/my/components";
import { SubscriptionDialog } from "@/features/subscription/components";
import { useManageCard } from "@/features/subscription/hooks";
import { SubscriptionProvider } from "@/features/subscription/providers/subscription-provider";
import { useLogout } from "@/entities/member/api/mutations";

export default function MypageScreen() {
  const navigate = useNavigate();
  const { openSettings } = useManageCard();
  const logout = useLogout();

  return (
    <Mypage>
      <Mypage.Profile
        name="하하"
        gender="남자"
        ageRange="7~10세"
        avatar="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop"
        onEditProfile={() => console.log("프로필 변경")}
      />

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

      <Mypage.MenuSection title="고객지원">
        <Mypage.MenuItem to="#">알림 설정</Mypage.MenuItem>
        <Mypage.MenuItem to="#">고객센터</Mypage.MenuItem>
        <Mypage.MenuItem to="#">약관 및 정책</Mypage.MenuItem>
      </Mypage.MenuSection>

      <Mypage.MenuSection title=" ">
        <Mypage.MenuItem
          onClick={() =>
            logout.mutate(undefined, {
              onSuccess: () => {
                navigate("/auth/login", { replace: true });
              },
            })
          }
        >
          로그아웃
        </Mypage.MenuItem>{" "}
        <Mypage.MenuItem to="#">회원탈퇴</Mypage.MenuItem>
      </Mypage.MenuSection>
    </Mypage>
  );
}
