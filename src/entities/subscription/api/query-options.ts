import { getSubcription, getSubscriptionPlans } from "./get";

export const subscriptionKeys = {
  getSubscriptionPlans: ["subscription", "plans"] as const,
  startSubscription: ["subscription", "start"] as const,
  getSubscription: ["subscription"] as const,
  deleteSubscription: ["subscription", "delete"] as const,
};

export const subscriptionQueryOptions = {
  getSubscriptionPlans: () => ({
    queryKey: subscriptionKeys.getSubscriptionPlans,
    queryFn: getSubscriptionPlans,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 0,
  }),

  getSubcription: () => ({
    queryKey: subscriptionKeys.getSubscription,
    queryFn: getSubcription,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 0,
  }),
};
