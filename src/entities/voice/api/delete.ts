import { BaseApiError } from "@/shared/lib/api/errors";
import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";

export const deleteVoice = async (voiceId: number): Promise<void> => {
  try {
    await api.delete(`voices/${voiceId}`).json<ApiResponse<null>>();
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = "toast";
    }
    throw err;
  }
};
