import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProfile } from "./create";
import { profileKeys } from "./query-options";
import type { AddProfileFormSubmit } from "@/features/profile/components/profile-add-form";

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddProfileFormSubmit) => createProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileKeys.getProfiles,
      });
    },
  });
};
