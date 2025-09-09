import type { UseQueryOptions } from "@tanstack/react-query";
import { getCustomTts, getTts, getVoices } from "./get";
import type { TtsResponse } from "../model";

export const voiceKeys = {
  getVoices: ["voices"] as const,
  getTts: (speakerId: string, fairyTaleId: number, page: number) => ["tts", speakerId, fairyTaleId, page] as const,
  getCustomTts: (speakerId: string, customFairyTaleId: number, page: number) =>
    ["tts", "custom", speakerId, customFairyTaleId, page] as const,

  createTts: (speakerId: string, fairyTaleId: number) => ["tts", "create", speakerId, fairyTaleId] as const,
  createCustomTts: (speakerId: string, customFairyTaleId: number) =>
    ["tts", "create", "custom", speakerId, customFairyTaleId] as const,
};

export const voiceQueryOptions = {
  getVoices: (displayMode: "toast" | "fallback" = "fallback") => ({
    queryKey: ["voices"] as const,
    queryFn: () => getVoices(displayMode),
    staleTime: 1000 * 60 * 5,
    gcTime: 0,
  }),

  getTts: (
    speakerId: string,
    fairyTaleId: number,
    page: number,
    displayMode: "toast" | "fallback" = "toast"
  ): UseQueryOptions<TtsResponse, Error, TtsResponse, ReturnType<typeof voiceKeys.getTts>> => ({
    queryKey: voiceKeys.getTts(speakerId, fairyTaleId, page),
    queryFn: () => getTts(speakerId, fairyTaleId, page, displayMode),
    staleTime: 1000 * 60 * 5,
    gcTime: 0,
  }),

  getCustomTts: (
    speakerId: string,
    customFairyTaleId: number,
    page: number,
    displayMode: "toast" | "fallback" = "toast"
  ): UseQueryOptions<TtsResponse, Error, TtsResponse, ReturnType<typeof voiceKeys.getCustomTts>> => ({
    queryKey: voiceKeys.getCustomTts(speakerId, customFairyTaleId, page),
    queryFn: () => getCustomTts(speakerId, customFairyTaleId, page, displayMode),
    staleTime: 1000 * 60 * 5,
    gcTime: 0,
  }),
};
