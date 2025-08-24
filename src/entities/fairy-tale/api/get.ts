import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import type { FairyTaleCategoryResponse, FairyTaleContentResponse, FairyTaleResponse } from "../models";
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

export const getFairyTalesByCategory = async (
  categoryId: number,
  page: number = 0,
  displayMode: DisplayMode = "fallback"
): Promise<FairyTaleResponse[]> => {
  try {
    const res = await api
      .get(`fairy-tale/categories/${categoryId}`, { searchParams: { page: String(page) } })
      .json<ApiResponse<FairyTaleResponse[]>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

/**
 * 동화책 상세 조회 API
 * @param fairyTaleId 동화책 ID
 */
export const getFairyTaleDetailById = async (
  fairyTaleId: string,
  displayMode: DisplayMode = "fallback"
): Promise<FairyTaleResponse> => {
  try {
    const res = await api.get(`fairy-tale/${fairyTaleId}`).json<ApiResponse<FairyTaleResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const searchFairyTales = async (keyword: string, page: number = 0): Promise<FairyTaleResponse[]> => {
  try {
    const res = await api
      .get("fairy-tale", { searchParams: { keyword, page: String(page) } })
      .json<ApiResponse<FairyTaleResponse[]>>();
    return res.data;
  } catch {
    return [];
  }
};
