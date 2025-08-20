import { createContext } from "react";

import type { Plan } from "@/features/my/types";

export interface SubscriptionContextValue {
  selectedPlan: Plan;
  setSelectedPlan: (plan: Plan) => void;
  isSubscribing: boolean;
  setIsSubscribing: (val: boolean) => void;
}

export const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);
