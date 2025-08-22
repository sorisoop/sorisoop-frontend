import { getCustomerKey } from "./get";

export const memberKeys = {
  getCustomerKey: ["customer-key"] as const,
};

export const memberQueryOptions = {
  getCustomerKey: () => ({
    queryKey: memberKeys.getCustomerKey,
    queryFn: getCustomerKey,
    staleTime: 0,
    gcTime: 0,
  }),
};
