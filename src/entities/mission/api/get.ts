import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { BaseApiError } from "@/shared/lib/api/errors";
import type { AssignedMissionResponse, GetGivenMissionResponse, MissionDetailResponse } from "../models";

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

export const getMissionDetail = async (missionId: number): Promise<MissionDetailResponse> => {
  try {
    const res = await api.get(`missions/${missionId}`).json<ApiResponse<MissionDetailResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = "fallback";
    }
    throw err;
  }
};

/**
 * 아이용 - 할당된 미션 목록 조회
 */
export const getAssignedMissions = async (): Promise<AssignedMissionResponse[]> => {
  try {
    const res = await api.get("missions/assigned").json<ApiResponse<AssignedMissionResponse[]>>();

    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = "fallback";
    }
    throw err;
  }
};
