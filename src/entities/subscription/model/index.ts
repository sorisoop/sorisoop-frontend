import type { Plan } from "@/features/my/types";

export interface SubscriptionPlan {
  id: number;
  type: Plan;
  price: number;
}

export interface SubscriptionResponse {
  status: "ACTIVE" | "CANCELLED" | "EXPIRED";
  nextBillingDate: string;
}

export interface Subscription {
  status: "ACTIVE" | "CANCELLED" | "PENDING";
  type: string;
  startedAt: string;
  nextBillingAt: string;
  cancelledAt?: string | null;
  lastApprovedAt?: string | null;
}
