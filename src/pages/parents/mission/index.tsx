// pages/parents/mission/MissionPage.tsx
import { useState } from "react";
import SelectChild from "@/features/parents/mission/components/select-child";
import SelectType from "@/features/parents/mission/components/select-mission";
import ReadByCategoryPage from "@/features/parents/mission/components/category-mission-page";

export default function MissionPage() {
  const [step, setStep] = useState<"child" | "type" | "form">("child");
  const [profileId, setProfileId] = useState<number | null>(null);

  if (step === "child") {
    return (
      <SelectChild
        onSelectComplete={(id: number) => {
          setProfileId(id);
          setStep("type");
        }}
      />
    );
  }

  if (step === "type" && profileId !== null) {
    return (
      <SelectType
        profileId={profileId}
        onSelectType={() => {
          // 어떤 값이든 받아도 무시하고 바로 카테고리 페이지로 이동
          setStep("form");
        }}
      />
    );
  }

  if (step === "form" && profileId !== null) {
    return <ReadByCategoryPage profileId={profileId} />;
  }

  return null;
}