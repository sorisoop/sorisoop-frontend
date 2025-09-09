import { useSuspenseQuery } from "@tanstack/react-query";
import { voiceKeys, voiceQueryOptions } from "./query-options";
import { getCustomTts, getTts } from "./get";
import type { TtsResponse } from "../model";

export const useGetVoices = () => {
  return useSuspenseQuery(voiceQueryOptions.getVoices());
};

export const useTts = (
  speakerId: string,
  fairyTaleId: number,
  page: number,
  displayMode: "toast" | "fallback" = "toast"
) => {
  return useSuspenseQuery<TtsResponse>({
    queryKey: voiceKeys.getTts(speakerId, fairyTaleId, page),
    queryFn: () => getTts(speakerId, fairyTaleId, page, displayMode),
  });
};

/**
 * 커스텀 동화 TTS 조회
 */
export const useCustomTts = (
  speakerId: string,
  customFairyTaleId: number,
  page: number,
  displayMode: "toast" | "fallback" = "toast"
) => {
  return useSuspenseQuery<TtsResponse>({
    queryKey: voiceKeys.getCustomTts(speakerId, customFairyTaleId, page),
    queryFn: () => getCustomTts(speakerId, customFairyTaleId, page, displayMode),
  });
};
