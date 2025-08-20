import { getCustomerKey } from "./get";

export const billingKeys = {
  getBillingCardStatus: ["billing", "card", "status"] as const,
  getCustomerKey: ["billing", "customer-key"] as const,
  getCreditCards: ["credit", "cards"] as const,
};

export const billingQueryOptions = {
  getCustomerKey: () => ({
    queryKey: billingKeys.getCustomerKey,
    queryFn: getCustomerKey,
    staleTime: 0,
    gcTime: 0,
  }),
};
