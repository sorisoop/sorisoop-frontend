import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import type { FairyTaleCategoryResponse, FairyTaleContentResponse } from "../models";
import { BaseApiError, type DisplayMode } from "@/shared/lib/api/errors";

export const getFairyTaleContents = async (id: string) => {
  const res = await api.get(`fairy-tale/${id}/contents`).json<ApiResponse<FairyTaleContentResponse[]>>();
  return res.data;
};

export const getFairyTaleCategories = async (
  displayMode: DisplayMode = "fallback"
): Promise<FairyTaleCategoryResponse[]> => {
  try {
    const res = await api.get("fairy-tale/categories").json<ApiResponse<FairyTaleCategoryResponse[]>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
