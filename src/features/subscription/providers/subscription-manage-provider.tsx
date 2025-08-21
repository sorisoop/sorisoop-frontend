import { useState } from "react";
import { useSubscription } from "@/entities/subscription/api/hooks";
import { SubscriptionManageContext } from "../contexts";

export function SubscriptionManageProvider({ children }: { children: React.ReactNode }) {
  const { data: subscription } = useSubscription();
  const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);

  return (
    <SubscriptionManageContext.Provider
      value={{
        subscription: subscription ?? null,
        isCancelDialogOpen,
        setCancelDialogOpen,
      }}
    >
      {children}
    </SubscriptionManageContext.Provider>
  );
}
