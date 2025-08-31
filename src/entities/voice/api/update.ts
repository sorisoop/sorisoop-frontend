import { api } from "@/shared/lib/api/ky";
import { BaseApiError } from "@/shared/lib/api/errors";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import type { UpdateVoiceRequest, VoiceResponse } from "../model";

export const updateVoice = async (voiceId: number, request: UpdateVoiceRequest): Promise<VoiceResponse> => {
  try {
    const res = await api.patch(`voices/${voiceId}`, { json: request }).json<ApiResponse<VoiceResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = "toast";
    }
    throw err;
  }
};
