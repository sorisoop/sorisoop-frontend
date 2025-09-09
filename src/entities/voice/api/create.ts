import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import type { AddVoicePayload } from "../model";
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

/**
 * 목소리 TTS 생성 요청
 */
export const createTts = async (
  speakerId: string,
  fairyTaleId: number,
  displayMode: "toast" | "fallback" = "toast"
): Promise<null> => {
  try {
    const res = await api.post("tts", { json: { speakerId, fairyTaleId } }).json<ApiResponse<null>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

/**
 * 커스텀 동화 TTS 생성 요청
 */
export const createCustomTts = async (
  speakerId: string,
  customFairyTaleId: number,
  displayMode: "toast" | "fallback" = "toast"
): Promise<null> => {
  try {
    const res = await api.post("tts/custom", { json: { speakerId, customFairyTaleId } }).json<ApiResponse<null>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
