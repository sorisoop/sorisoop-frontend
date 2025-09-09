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
 */
export const getTts = async (
  speakerId: string,
  fairyTaleId: number,
  page: number,
  displayMode: "toast" | "fallback" = "toast"
): Promise<TtsResponse> => {
  try {
    const res = await api
      .get(`tts/${speakerId}/${fairyTaleId}`, { searchParams: { page } })
      .json<ApiResponse<TtsResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const getCustomTts = async (
  speakerId: string,
  customFairyTaleId: number,
  page: number,
  displayMode: "toast" | "fallback" = "toast"
): Promise<TtsResponse> => {
  try {
    const res = await api
      .get(`tts/custom/${speakerId}/${customFairyTaleId}`, { searchParams: { page } })
      .json<ApiResponse<TtsResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
