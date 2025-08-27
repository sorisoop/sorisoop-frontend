import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AddVoiceRequest } from "@/entities/voice/model";
import { addVoice } from "./create";
import { voiceKeys } from "./query-options";

export const useAddVoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ voiceFile, request }: AddVoiceRequest) => addVoice(voiceFile, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voiceKeys.getVoices });
    },
  });
};
