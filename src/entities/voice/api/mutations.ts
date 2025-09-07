import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AddVoiceRequest, UpdateVoiceRequest } from "@/entities/voice/model";
import { addVoice, selectVoice } from "./create";
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

export const useSelectVoice = () => {
  return useMutation({
    mutationFn: (voiceId: number) => selectVoice(voiceId),
    meta: { displayMode: "toast" },
  });
};
