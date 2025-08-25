import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { BaseApiError, type DisplayMode } from "@/shared/lib/api/errors";

export const deleteFavorite = async (fairyTaleId: number, displayMode: DisplayMode = "toast"): Promise<null> => {
  try {
    const res = await api.delete(`fairy-tale/${fairyTaleId}/favorites`, {}).json<ApiResponse<null>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
