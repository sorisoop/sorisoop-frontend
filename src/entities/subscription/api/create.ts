import type { Plan } from "@/features/my/types";
import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import type { SubscriptionResponse } from "../model";

interface StartSubscriptionRequest {
  planType: Plan;
  orderId: string;
  paymentKey: string;
  amount: number;
}

export const startSubscription = async (payload: StartSubscriptionRequest): Promise<SubscriptionResponse> => {
  const res = await api.post("subscription", { json: payload }).json<ApiResponse<SubscriptionResponse>>();
  return res.data;
};
