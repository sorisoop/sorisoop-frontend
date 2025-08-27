import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { BaseApiError } from "@/shared/lib/api/errors";
import type { VoiceResponse } from "../model";

export const getVoices = async (displayMode: "toast" | "fallback" = "fallback"): Promise<VoiceResponse[]> => {
  try {
    const res = await api.get("voices").json<ApiResponse<VoiceResponse[]>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
