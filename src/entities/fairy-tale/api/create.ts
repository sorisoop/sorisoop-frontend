import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { BaseApiError, type DisplayMode } from "@/shared/lib/api/errors";

/**
 * 동화책 찜하기 API
 * @param fairyTaleId - 동화책 ID
 * @param displayMode - 에러 발생 시 표시 방식 ("toast" | "fallback")
 */
export const addFavorite = async (fairyTaleId: number, displayMode: DisplayMode = "toast"): Promise<null> => {
  try {
    const res = await api.post(`fairy-tale/${fairyTaleId}/favorites`).json<ApiResponse<null>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
