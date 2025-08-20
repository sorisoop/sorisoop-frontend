import { useContext } from "react";

import { SubscriptionContext } from "../contexts/subscription-context";

export const useSubscriptionContext = () => {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error("useSubscription must be used within a SubscriptionProvider");
  return context;
};
