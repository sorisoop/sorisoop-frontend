import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { api } from "@/shared/lib/api/ky";
import type { CheckEmailResponse, CustomerKeyResponse } from "../model";
import { BaseApiError, type DisplayMode } from "@/shared/lib/api/errors";

export const getCustomerKey = async (): Promise<CustomerKeyResponse> => {
  const res = await api.post("members/customer-key").json<ApiResponse<CustomerKeyResponse>>();
  return res.data;
};

/**
 * 이메일 중복 확인 API
 * @param email - 확인할 이메일
 * @param displayMode - 에러 발생 시 표시 방식 ("toast" | "fallback")
 */
export const checkEmail = async (email: string, displayMode: DisplayMode = "toast"): Promise<boolean> => {
  try {
    const res = await api
      .get("members/check-email", {
        searchParams: { email },
      })
      .json<ApiResponse<CheckEmailResponse>>();

    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
