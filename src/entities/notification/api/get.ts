import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { BaseApiError } from "@/shared/lib/api/errors";

/**
 * 알림 허용 여부 조회
 * @returns "true" | "false" | 기타 서버 문자열
 */
export const getNotificationStatus = async (displayMode: "toast" | "fallback" = "fallback"): Promise<string> => {
  try {
    const res = await api.get("notifications/status").json<ApiResponse<string>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
