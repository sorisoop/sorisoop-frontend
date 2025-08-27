import { createContext } from "react";
import type { ProfileResponse } from "@/entities/profile/model";

export type ProfileManageDialogContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  selectedProfile: ProfileResponse | null;
  setSelectedProfile: (p: ProfileResponse | null) => void;
};

export const ProfileManageDialogContext = createContext<ProfileManageDialogContextValue | null>(null);
