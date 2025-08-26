import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite, createCustomSynopsis, makeCustomFairyTale } from "./create";
import { deleteFavorite } from "./delete";
import { fairyTaleKeys } from "./query-options";
import type { FairyTaleResponse, MakeCustomFairyTaleRequest } from "../model";

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fairyTaleId }: { fairyTaleId: number }) => addFavorite(fairyTaleId),

    onSuccess: (_, variables) => {
      queryClient.setQueryData<FairyTaleResponse[]>(fairyTaleKeys.getFairyTaleByRandom(), (old) =>
        old ? old.map((t) => (t.id === variables.fairyTaleId ? { ...t, isFavorite: true } : t)) : old
      );

      queryClient.invalidateQueries({
        queryKey: fairyTaleKeys.getFavoriteFairyTales(),
      });
    },
  });
};

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fairyTaleId }: { fairyTaleId: number }) => deleteFavorite(fairyTaleId),

    onSuccess: (_, variables) => {
      queryClient.setQueryData<FairyTaleResponse[]>(fairyTaleKeys.getFairyTaleByRandom(), (old) =>
        old ? old.map((t) => (t.id === variables.fairyTaleId ? { ...t, isFavorite: false } : t)) : old
      );

      queryClient.invalidateQueries({
        queryKey: fairyTaleKeys.getFavoriteFairyTales(),
      });
    },
  });
};

export const useCreateCustomSynopsis = () => {
  const mutation = useMutation({
    mutationFn: (file: Blob) => createCustomSynopsis(file),
  });

  return mutation.mutateAsync;
};

export const useMakeCustomFairyTale = () => {
  return useMutation({
    mutationFn: (payload: MakeCustomFairyTaleRequest) => makeCustomFairyTale(payload),
  });
};
