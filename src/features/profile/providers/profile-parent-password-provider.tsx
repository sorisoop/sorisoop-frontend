import { useState } from "react";
import { ProfileParentPasswordContext } from "@/features/profile/contexts";

export function ProfileParentPasswordProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  return (
    <ProfileParentPasswordContext.Provider value={{ open, setOpen, targetId, setTargetId }}>
      {children}
    </ProfileParentPasswordContext.Provider>
  );
}
