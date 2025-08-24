import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProfile } from "./create";
import { profileKeys } from "./query-options";
import type { AddProfileFormSubmit } from "@/features/profile/components/profile-add-form";
import { selectProfile } from "./select";

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

export const useSelectProfile = () => {
  return useMutation({
    mutationFn: (profileId: number) => selectProfile(profileId),
  });
};
