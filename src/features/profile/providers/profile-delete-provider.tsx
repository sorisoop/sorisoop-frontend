import { useState } from "react";
import { ProfileDeleteContext } from "../contexts/profile-delete-context";

export function ProfileDeleteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  return (
    <ProfileDeleteContext.Provider value={{ open, setOpen, targetId, setTargetId }}>
      {children}
    </ProfileDeleteContext.Provider>
  );
}
