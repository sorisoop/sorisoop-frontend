import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite, createCustomSynopsis, makeCustomFairyTale } from "./create";
import { deleteCustomFairyTale, deleteFavorite } from "./delete";
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
        queryKey: ["fairy-tale"],
        exact: false,
        predicate: (query) => query.queryKey.toString() !== fairyTaleKeys.getFairyTaleByRandom().toString(),
      });

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
        queryKey: ["fairy-tale"],
        exact: false,
        predicate: (query) => query.queryKey.toString() !== fairyTaleKeys.getFairyTaleByRandom().toString(),
      });

      queryClient.invalidateQueries({
        queryKey: fairyTaleKeys.getFavoriteFairyTales(),
      });
    },
  });
};

export const useCreateCustomSynopsis = () => {
  return useMutation({
    mutationFn: (file: Blob) => createCustomSynopsis(file),
    throwOnError: false,
  });
};

export const useMakeCustomFairyTale = () => {
  return useMutation({
    mutationFn: (payload: MakeCustomFairyTaleRequest) => makeCustomFairyTale(payload),
  });
};

export const useDeleteCustomFairyTale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customFairyTaleId: number) => deleteCustomFairyTale(customFairyTaleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fairyTaleKeys.getCustomFairyTales(0) });
    },
  });
};
