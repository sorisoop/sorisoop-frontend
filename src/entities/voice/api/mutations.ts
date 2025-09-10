import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AddVoiceRequest, UpdateVoiceRequest } from "@/entities/voice/model";
import { addVoice, createCustomTts, createTts } from "./create";
import { voiceKeys } from "./query-options";
import { updateVoice } from "./update";
import { deleteVoice } from "./delete";

export const useAddVoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ voiceFile, request }: AddVoiceRequest) => addVoice(voiceFile, request),
    meta: { displayMode: "toast" },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voiceKeys.getVoices });
    },
  });
};

export const useCreateTts = () => {
  return useMutation({
    mutationFn: ({ speakerId, fairyTaleId }: { speakerId: string; fairyTaleId: number }) =>
      createTts(speakerId, fairyTaleId),
    meta: { displayMode: "toast" },
  });
};

export const useCreateCustomTts = () => {
  return useMutation({
    mutationFn: ({ speakerId, customFairyTaleId }: { speakerId: string; customFairyTaleId: number }) =>
      createCustomTts(speakerId, customFairyTaleId),
    meta: { displayMode: "toast" },
  });
};

export const useUpdateVoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ voiceId, request }: { voiceId: number; request: UpdateVoiceRequest }) =>
      updateVoice(voiceId, request),
    meta: { displayMode: "toast" },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voiceKeys.getVoices });
    },
  });
};

export const useDeleteVoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (voiceId: number) => deleteVoice(voiceId),
    meta: { displayMode: "toast" },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voiceKeys.getVoices });
    },
  });
};
