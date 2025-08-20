import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCreditCard } from "./delete";
import { billingKeys } from "./query-options";

export const useDeleteCreditCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cardId: string) => deleteCreditCard(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: billingKeys.getCreditCards });
    },
  });
};
