import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AddVoiceRequest, UpdateVoiceRequest } from "@/entities/voice/model";
import { addVoice } from "./create";
import { voiceKeys } from "./query-options";
import { updateVoice } from "./update";
import { deleteVoice } from "./delete";

export const useAddVoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ voiceFile, request }: AddVoiceRequest) => addVoice(voiceFile, request),
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voiceKeys.getVoices });
    },
  });
};

export const useDeleteVoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (voiceId: number) => deleteVoice(voiceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voiceKeys.getVoices });
    },
  });
};
