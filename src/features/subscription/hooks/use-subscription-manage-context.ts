import { useContext } from "react";
import { SubscriptionManageContext } from "../contexts";

export const useSubscriptionManageContext = () => {
  const ctx = useContext(SubscriptionManageContext);
  if (!ctx) throw new Error("useSubscriptionManageContext must be used within SubscriptionManageProvider");
  return ctx;
};
