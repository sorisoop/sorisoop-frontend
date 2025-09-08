import { useSuspenseQuery } from "@tanstack/react-query";
import { statisticsQueryOptions } from "./query-options";

export function useCompletionStatistics(childProfileId: number) {
  return useSuspenseQuery(statisticsQueryOptions.completion(childProfileId));
}

export function useCategoryStatistics(childProfileId: number) {
  return useSuspenseQuery(statisticsQueryOptions.categories(childProfileId));
}
