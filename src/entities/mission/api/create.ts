import { api } from "@/shared/lib/api/ky";
import type { CreateMissionRequest } from "../models";
import { BaseApiError, type DisplayMode } from "@/shared/lib/api/errors";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";

/**
 * 미션 생성 API
 * @param data - 미션 생성 요청 DTO
 * @param displayMode - 에러 발생 시 표시 방식 ("toast" | "fallback")
 */
export const createMission = async (data: CreateMissionRequest, displayMode: DisplayMode = "toast"): Promise<null> => {
  try {
    const res = await api
      .post("missions", {
        json: data,
      })
      .json<ApiResponse<null>>();

    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
