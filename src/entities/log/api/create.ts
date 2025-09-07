import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import type { SaveReadLogRequest } from "../models";

export const saveReadLog = async (data: SaveReadLogRequest): Promise<void> => {
  try {
    await api.post("read-logs", { json: data }).json<ApiResponse<null>>();
  } catch {
    // 실패 무시
  }
};
