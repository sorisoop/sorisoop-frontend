import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { BaseApiError } from "@/shared/lib/api/errors";

/**
 * 알림 상태 토글/업데이트
 * 서버에서 알아서 켜기/끄기 처리
 * @returns "true" | "false"
 */
export const updateNotificationStatus = async (displayMode: "toast" | "fallback" = "toast"): Promise<null> => {
  try {
    const res = await api.patch("notifications/status").json<ApiResponse<null>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
