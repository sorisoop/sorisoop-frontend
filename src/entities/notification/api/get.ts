import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { BaseApiError } from "@/shared/lib/api/errors";
import type { NotificationResonse } from "../model";

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

/**
 * 안 읽은 알림 여부 조회
 * @returns true | false
 */
export const getUnreadNotifications = async (displayMode: "toast" | "fallback" = "toast"): Promise<boolean> => {
  try {
    const res = await api.get("notifications/unread").json<ApiResponse<boolean>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

/**
 * 알림 전체 조회
 * @returns NotificationResponse[]
 */
export const getNotifications = async (displayMode: "toast" | "fallback" = "toast"): Promise<NotificationResonse[]> => {
  try {
    const res = await api.get("notifications").json<ApiResponse<NotificationResonse[]>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
