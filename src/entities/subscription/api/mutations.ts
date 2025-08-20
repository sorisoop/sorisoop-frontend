import { useMutation } from "@tanstack/react-query";

import { startSubscription } from "./create";

export const useStartSubscription = () => {
  return useMutation({
    mutationFn: startSubscription,
  });
};
