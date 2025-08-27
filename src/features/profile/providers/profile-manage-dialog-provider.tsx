import { useState } from "react";
import { ProfileManageDialogContext } from "../contexts";
import type { ProfileResponse } from "@/entities/profile/model";

export function ProfileManageDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<ProfileResponse | null>(null);

  return (
    <ProfileManageDialogContext.Provider value={{ open, setOpen, selectedProfile, setSelectedProfile }}>
      {children}
    </ProfileManageDialogContext.Provider>
  );
}
