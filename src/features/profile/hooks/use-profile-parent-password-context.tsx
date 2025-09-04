import { useContext } from "react";
import { ProfileParentPasswordContext } from "@/features/profile/contexts";

export function useProfileParentPasswordContext() {
  const context = useContext(ProfileParentPasswordContext);
  if (!context) {
    throw new Error("useProfilePasswordContext must be used within ProfilePasswordProvider");
  }
  return context;
}
