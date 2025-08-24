import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { BaseApiError, type DisplayMode } from "@/shared/lib/api/errors";

/**
 * 프로필 선택 API
 * @param profileId - 선택할 프로필 ID
 * @param displayMode - 에러 발생 시 표시 방식 ("toast" | "fallback")
 */
export const selectProfile = async (profileId: number, displayMode: DisplayMode = "toast"): Promise<null> => {
  try {
    const res = await api.post(`profiles/${profileId}`).json<ApiResponse<null>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
