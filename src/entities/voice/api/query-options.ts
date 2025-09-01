import type { UseQueryOptions } from "@tanstack/react-query";
import { createTts } from "./create";
import { getTts, getVoices } from "./get";
import type { TtsResponse } from "../model";

export const voiceKeys = {
  getVoices: ["voices"] as const,
  getTts: (voiceUuid: string, page: number) => ["tts", voiceUuid, page] as const,
  createTts: (voiceUuid: string, fairyTaleId: number) => ["tts", "create", voiceUuid, fairyTaleId] as const,
};

export const voiceQueryOptions = {
  getVoices: (displayMode: "toast" | "fallback" = "fallback") => ({
    queryKey: ["voices"] as const,
    queryFn: () => getVoices(displayMode),
    staleTime: 1000 * 60 * 5,
    gcTime: 0,
  }),

  getTts: (
    voiceUuid: string,
    page: number,
    displayMode: "toast" | "fallback" = "toast"
  ): UseQueryOptions<TtsResponse, Error, TtsResponse, ReturnType<typeof voiceKeys.getTts>> => ({
    queryKey: voiceKeys.getTts(voiceUuid, page),
    queryFn: () => getTts(voiceUuid, page, displayMode),
    staleTime: 1000 * 60 * 5,
    gcTime: 0,
  }),

  createTts: (
    voiceUuid: string,
    fairyTaleId: number,
    displayMode: "toast" | "fallback" = "toast"
  ): UseQueryOptions<TtsResponse, Error, TtsResponse, ReturnType<typeof voiceKeys.createTts>> => ({
    queryKey: voiceKeys.createTts(voiceUuid, fairyTaleId),
    queryFn: () => createTts(voiceUuid, fairyTaleId, displayMode),
    staleTime: 1000 * 60 * 5,
    gcTime: 0,
  }),
};
