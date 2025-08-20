import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import type { CustomerKeyResponse } from "../model/api-response";

export const getCustomerKey = async (): Promise<CustomerKeyResponse> => {
  const res = await api.post("billing/customer-key").json<ApiResponse<CustomerKeyResponse>>();
  return res.data;
};
