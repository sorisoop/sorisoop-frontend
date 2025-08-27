import { useContext } from "react";
import { ProfileDeleteContext } from "../contexts/profile-delete-context";

export const useProfileDeleteContext = () => {
  const context = useContext(ProfileDeleteContext);
  if (!context) throw new Error("useProfileDeleteContext must be used within ProfileDeleteProvider");
  return context;
};
