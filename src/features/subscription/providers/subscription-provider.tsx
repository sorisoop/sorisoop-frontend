import { useState } from "react";

import type { Plan } from "@/features/my/types";

import { SubscriptionContext } from "../contexts/subscription-context";

interface SubscriptionProviderProps {
  children: React.ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan>("MONTH");
  const [isSubscribing, setIsSubscribing] = useState(false);

  return (
    <SubscriptionContext.Provider value={{ selectedPlan, setSelectedPlan, isSubscribing, setIsSubscribing }}>
      {children}
    </SubscriptionContext.Provider>
  );
}
