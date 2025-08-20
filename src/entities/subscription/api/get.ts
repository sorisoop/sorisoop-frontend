import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import type { Subscription, SubscriptionPlan } from "../model";

export const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
  const res = await api.get("subscription/plans").json<ApiResponse<SubscriptionPlan[]>>();
  return res.data;
};

export const getSubcription = async (): Promise<Subscription | null> => {
  const res = await api.get(`subscription`).json<ApiResponse<Subscription>>();
  return res.data;
};
