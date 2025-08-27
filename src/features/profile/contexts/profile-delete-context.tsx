import { createContext } from "react";

export type ProfileDeleteContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  targetId: number | null;
  setTargetId: (id: number | null) => void;
};

export const ProfileDeleteContext = createContext<ProfileDeleteContextValue | null>(null);
