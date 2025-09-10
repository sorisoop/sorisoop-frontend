import { useSuspenseQuery, type UseSuspenseQueryOptions } from "@tanstack/react-query";
import { voiceKeys, voiceQueryOptions } from "./query-options";
import { getCustomTts, getTts } from "./get";
import type { TtsResponse } from "../model";
import { useCallback } from "react";

export const useGetVoices = () => {
  return useSuspenseQuery(voiceQueryOptions.getVoices());
};

/**
 * 기본 동화 TTS 조회
 */
export const useTts = (
  speakerId: string,
  fairyTaleId: number,
  page: number,
  displayMode: "toast" | "fallback" = "toast",
  options?: Omit<UseSuspenseQueryOptions<TtsResponse>, "queryKey" | "queryFn">
) => {
  const queryKey = voiceKeys.getTts(speakerId, fairyTaleId, page);

  const queryFn = useCallback(() => {
    return getTts(speakerId, fairyTaleId, page, displayMode);
  }, [speakerId, fairyTaleId, page, displayMode]);

  return useSuspenseQuery<TtsResponse>({
    queryKey,
    queryFn,
    ...options,
  });
};

/**
 * 커스텀 동화 TTS 조회
 */
export const useCustomTts = (
  speakerId: string,
  customFairyTaleId: number,
  page: number,
  displayMode: "toast" | "fallback" = "toast",
  options?: Omit<UseSuspenseQueryOptions<TtsResponse>, "queryKey" | "queryFn">
) => {
  const queryKey = voiceKeys.getCustomTts(speakerId, customFairyTaleId, page);

  const queryFn = useCallback(() => {
    return getCustomTts(speakerId, customFairyTaleId, page, displayMode);
  }, [speakerId, customFairyTaleId, page, displayMode]);

  return useSuspenseQuery<TtsResponse>({
    queryKey,
    queryFn,
    ...options,
  });
};
