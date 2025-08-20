import { useSuspenseQuery } from "@tanstack/react-query";
import { billingQueryOptions } from "./query-options";
import { type CustomerKeyResponse } from "../model/api-response";

export const useCustomerKey = () => {
  return useSuspenseQuery<CustomerKeyResponse>(billingQueryOptions.getCustomerKey());
};
