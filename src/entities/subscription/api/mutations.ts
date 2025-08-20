import { useMutation, useQueryClient } from "@tanstack/react-query";

import { startSubscription } from "./create";
import { deleteSubcription } from "./delete";
import { subscriptionKeys } from "./query-options";
import { restartSubscription } from "./update";

export const useStartSubscription = () => {
  return useMutation({
    mutationFn: startSubscription,
  });
};

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubcription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.getSubscription,
      });
    },
  });
};

export const useRestartSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restartSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.getSubscription,
      });
    },
  });
};
