import { createContext } from "react";
interface ProfileAddContextValue {
  isOpen: boolean;
  setOpen: (v: boolean) => void;
}

export const ProfileAddContext = createContext<ProfileAddContextValue | null>(null);
