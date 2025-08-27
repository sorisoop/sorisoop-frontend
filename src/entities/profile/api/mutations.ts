import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProfile } from "./create";
import { profileKeys } from "./query-options";
import type { AddProfileFormSubmit } from "@/features/profile/components/profile-add-form";
import { selectProfile } from "./select";
import { updateProfile } from "./update";
import { deleteProfile } from "./delete";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileId: number) => selectProfile(profileId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === "fairy-tale",
      });

      queryClient.invalidateQueries({
        predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === "custom",
      });

      queryClient.invalidateQueries({
        predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === "profile",
      });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddProfileFormSubmit & { id: number }) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileKeys.getProfiles,
      });
    },
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (profileId: number) => deleteProfile(profileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.getProfiles });
    },
  });
};
