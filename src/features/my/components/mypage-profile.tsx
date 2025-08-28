import { useProfile } from "@/entities/profile/api/hooks";
import { Button } from "@/shared/components/ui/button";
import React, { useState } from "react";

type DialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export default function MypageProfile({ children }: { children: React.ReactElement<DialogProps> }) {
  const { data: profile } = useProfile();

  const [open, setOpen] = useState(false);

  return (
    <section className="pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={profile.profileImage ?? "/default.webp"}
            alt="프로필 이미지"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <p className="text-lg font-bold">{profile.nickname}</p>
            <p className="text-sm text-muted-foreground">
              {profile.role === "CHILD" ? "아이" : "부모"} · {profile.gender === "M" ? "남자" : "여자"} · {profile.age}
              세
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="text-sm border-border rounded" onClick={() => setOpen(true)}>
          프로필 변경
        </Button>
      </div>
      {React.cloneElement(children, {
        open,
        onOpenChange: setOpen,
      })}
    </section>
  );
}
