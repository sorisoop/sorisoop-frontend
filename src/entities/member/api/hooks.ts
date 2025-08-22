import { useSuspenseQuery } from "@tanstack/react-query";
import type { CustomerKeyResponse } from "../model";
import { memberQueryOptions } from "./query-options";

export const useCustomerKey = () => {
  return useSuspenseQuery<CustomerKeyResponse>(memberQueryOptions.getCustomerKey());
};
