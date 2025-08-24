import { useContext } from "react";
import { ProfileAddContext } from "../contexts";

export function useProfileAddContext() {
  const ctx = useContext(ProfileAddContext);
  if (!ctx) {
    throw new Error("useProfileAddContext must be used within a ProfileAddProvider");
  }
  return ctx;
}
