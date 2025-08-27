import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { BaseApiError, type DisplayMode } from "@/shared/lib/api/errors";

/**
 * 프로필 삭제 API
 * @param profileId - 삭제할 프로필 ID
 * @param displayMode - 에러 발생 시 표시 방식 ("toast" | "fallback")
 */
export const deleteProfile = async (profileId: number, displayMode: DisplayMode = "toast"): Promise<null> => {
  try {
    const res = await api.delete(`profiles/${profileId}`).json<ApiResponse<null>>();

    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
