import { createContext } from "react";
import type { Subscription } from "@/entities/subscription/model";

export interface SubscriptionManageContextValue {
  subscription: Subscription | null;
}

export const SubscriptionManageContext = createContext<SubscriptionManageContextValue | null>(null);
