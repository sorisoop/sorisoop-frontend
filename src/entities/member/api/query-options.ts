import { checkEmail, getCustomerKey } from "./get";

export const memberKeys = {
  getCustomerKey: ["customer-key"] as const,
  signup: ["signup"] as const,
  checkEmail: (email: string) => ["check-email", email] as const,
};

export const memberQueryOptions = {
  getCustomerKey: () => ({
    queryKey: memberKeys.getCustomerKey,
    queryFn: getCustomerKey,
    staleTime: 0,
    gcTime: 0,
  }),

  checkEmail: (email: string, displayMode: "toast" | "fallback" = "toast") => ({
    queryKey: memberKeys.checkEmail(email),
    queryFn: () => checkEmail(email, displayMode),
    enabled: false,
    staleTime: 0,
    gcTime: 0,
  }),
};
