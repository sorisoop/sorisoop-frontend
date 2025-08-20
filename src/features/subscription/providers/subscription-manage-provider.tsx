import { useSubscription } from "@/entities/subscription/api/hooks";
import { SubscriptionManageContext } from "../contexts";

export function SubscriptionManageProvider({ children }: { children: React.ReactNode }) {
  const { data: subscription } = useSubscription();
  return (
    <SubscriptionManageContext.Provider value={{ subscription: subscription ?? null }}>
      {children}
    </SubscriptionManageContext.Provider>
  );
}
