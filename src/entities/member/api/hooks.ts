import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import type { CustomerKeyResponse } from "../model";
import { memberQueryOptions } from "./query-options";

export const useCustomerKey = () => {
  return useSuspenseQuery<CustomerKeyResponse>(memberQueryOptions.getCustomerKey());
};

export const useCheckEmail = (email: string) => {
  return useQuery(memberQueryOptions.checkEmail(email));
};
