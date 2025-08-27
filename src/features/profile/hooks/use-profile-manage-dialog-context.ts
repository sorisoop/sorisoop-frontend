import { useContext } from "react";
import { ProfileManageDialogContext } from "../contexts";

export function useProfileManageDialogContext() {
  const context = useContext(ProfileManageDialogContext);
  if (!context) {
    throw new Error("useProfileManageDialog must be used within ProfileManageDialogProvider");
  }
  return context;
}
