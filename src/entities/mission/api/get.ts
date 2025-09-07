// src/entities/mission/api/get.ts
import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { BaseApiError } from "@/shared/lib/api/errors";
import type { GetGivenMissionResponse } from "../models";

/**
 * 부모가 아이에게 준 미션 목록 조회
 * @param childProfileId 아이 프로필 ID
 */
export const getGivenMissions = async (childProfileId: number): Promise<GetGivenMissionResponse[]> => {
  try {
    const res = await api.get(`missions/${childProfileId}/given`).json<ApiResponse<GetGivenMissionResponse[]>>();

    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = "fallback";
    }
    throw err;
  }
};
