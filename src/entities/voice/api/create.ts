import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import type { AddVoicePayload, TtsResponse } from "../model";
import { api } from "@/shared/lib/api/ky";
import { BaseApiError } from "@/shared/lib/api/errors";

export const addVoice = async (
  voiceFile: File,
  request: AddVoicePayload,
  displayMode: "toast" | "fallback" = "toast"
): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("voice", voiceFile);
    formData.append("request", JSON.stringify(request));

    await api.post("voices", { body: formData }).json<ApiResponse<null>>();
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const selectVoice = async (
  voiceId: number,
  displayMode: "toast" | "fallback" = "toast"
): Promise<{ voiceUuid: string }> => {
  try {
    const res = await api.post(`tts/voices/${voiceId}`).json<ApiResponse<{ voiceUuid: string }>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

/**
 * 첫 페이지 TTS 생성 요청
 */
export const createTts = async (
  speakerId: string,
  fairyTaleId: number,
  displayMode: "toast" | "fallback" = "toast"
): Promise<TtsResponse> => {
  try {
    const res = await api.post("tts", { json: { speakerId, fairyTaleId } }).json<ApiResponse<TtsResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const createCustomTts = async (
  voiceUuid: string,
  customFairyTaleId: number,
  displayMode: "toast" | "fallback" = "toast"
): Promise<TtsResponse> => {
  try {
    const res = await api
      .post("tts/custom", { json: { voiceUuid, customFairyTaleId } })
      .json<ApiResponse<TtsResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
