import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { BaseApiError } from "@/shared/lib/api/errors";
import type { TtsResponse, VoiceResponse } from "../model";

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

/**
 * 페이지별 TTS 조회
 * @param voiceUuid 음성 UUID
 * @param page 조회할 페이지 번호 (1부터 시작)
 */
export const getTts = async (
  voiceUuid: string,
  page: number,
  displayMode: "toast" | "fallback" = "toast"
): Promise<TtsResponse> => {
  try {
    const res = await api.get(`tts/${voiceUuid}`, { searchParams: { page } }).json<ApiResponse<TtsResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
