import { useSuspenseQuery } from "@tanstack/react-query";
import { subscriptionQueryOptions } from "./query-options";

export const useSubscriptionPlans = () => {
  return useSuspenseQuery(subscriptionQueryOptions.getSubscriptionPlans());
};

export const useSubscription = () => {
  return useSuspenseQuery(subscriptionQueryOptions.getSubcription());
};
