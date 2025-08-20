import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import type { SubscriptionResponse } from "../model";

export const restartSubscription = async (): Promise<SubscriptionResponse> => {
  const res = await api.post("subscription/restart").json<ApiResponse<SubscriptionResponse>>();
  return res.data;
};
