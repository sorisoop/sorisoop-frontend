import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FairyTaleResponse } from "@/entities/fairy-tale/models";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { addFavorite } from "./create";
import { deleteFavorite } from "./delete";

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fairyTaleId, profileId }: { fairyTaleId: number; profileId: number }) =>
      addFavorite(fairyTaleId, profileId),

    onSuccess: (_, { fairyTaleId }) => {
      queryClient.setQueryData<ApiResponse<FairyTaleResponse[]>>(["fairyTales"], (old) => {
        if (!old) return old;

        const updatedData = old.data.map((tale) => (tale.id === fairyTaleId ? { ...tale, isFavorite: true } : tale));

        return { ...old, data: updatedData };
      });
    },
  });
};

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fairyTaleId, profileId }: { fairyTaleId: number; profileId: number }) =>
      deleteFavorite(fairyTaleId, profileId),

    onSuccess: (_, { fairyTaleId }) => {
      queryClient.setQueryData<ApiResponse<FairyTaleResponse[]>>(["fairyTales"], (old) => {
        if (!old) return old;

        const updatedData = old.data.map((tale) => (tale.id === fairyTaleId ? { ...tale, isFavorite: false } : tale));

        return { ...old, data: updatedData };
      });
    },
  });
};
