import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite } from "./create";
import { deleteFavorite } from "./delete";

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fairyTaleId }: { fairyTaleId: number }) => addFavorite(fairyTaleId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fairy-tale"] });
    },
  });
};

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fairyTaleId }: { fairyTaleId: number }) => deleteFavorite(fairyTaleId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fairy-tale"] });
    },
  });
};
