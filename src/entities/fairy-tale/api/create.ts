import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { BaseApiError, type DisplayMode } from "@/shared/lib/api/errors";
import type { CustomFairyTaleConceptResponse } from "../model";

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

export const createCustomSynopsis = async (
  file: Blob,
  displayMode: DisplayMode = "toast"
): Promise<CustomFairyTaleConceptResponse> => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await api
      .post("fairy-tale/custom/synopsis", {
        body: formData,
      })
      .json<ApiResponse<CustomFairyTaleConceptResponse>>();

    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
