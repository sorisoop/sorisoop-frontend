import { createContext } from "react";

export interface ProfileParentPasswordContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  targetId: number | null;
  setTargetId: (id: number | null) => void;
}

export const ProfileParentPasswordContext = createContext<ProfileParentPasswordContextValue | null>(null);
