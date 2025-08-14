import { useState } from "react";

import { Mypage } from "@/features/my/components";
import { SubscribePaymentDialog } from "@/features/payments/components";

export default function MypageScreen() {
  const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly">("yearly");

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
        <SubscribePaymentDialog selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />
      </Mypage.SubscribeBanner>

      <Mypage.MenuSection title="구독">
        <Mypage.MenuItem to="/subscription/manage">구독 관리</Mypage.MenuItem>
      </Mypage.MenuSection>

      <Mypage.MenuSection title="고객지원">
        <Mypage.MenuItem to="#">알림 설정</Mypage.MenuItem>
        <Mypage.MenuItem to="#">고객센터</Mypage.MenuItem>
        <Mypage.MenuItem to="#">약관 및 정책</Mypage.MenuItem>
      </Mypage.MenuSection>

      <Mypage.MenuSection title=" ">
        <Mypage.MenuItem to="#">로그아웃</Mypage.MenuItem>
        <Mypage.MenuItem to="#">회원탈퇴</Mypage.MenuItem>
      </Mypage.MenuSection>
    </Mypage>
  );
}
