import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { BaseApiError } from "@/shared/lib/api/errors";
import type { CategoryStatisticsResponse, CompletionStatisticsResponse } from "../model";

/**
 * 아이의 완독 비율 통계 조회
 */
export const getCompletionStatistics = async (childProfileId: number): Promise<CompletionStatisticsResponse[]> => {
  try {
    const res = await api
      .get(`statistics/${childProfileId}/completion`)
      .json<ApiResponse<CompletionStatisticsResponse[]>>();

    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = "fallback";
    }
    throw err;
  }
};

/**
 * 아이의 카테고리별 통계 조회
 */
export const getCategoryStatistics = async (childProfileId: number): Promise<CategoryStatisticsResponse[]> => {
  try {
    const res = await api
      .get(`statistics/${childProfileId}/categories`)
      .json<ApiResponse<CategoryStatisticsResponse[]>>();

    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = "fallback";
    }
    throw err;
  }
};
