import { queryOptions } from "@tanstack/react-query";
import { getCompletionStatistics, getCategoryStatistics } from "./get";

export const statisticsKeys = {
  getCompletionStatistics: (childProfileId: number) => ["statistics", "completion", childProfileId] as const,
  getCategoryStatistics: (childProfileId: number) => ["statistics", "categories", childProfileId] as const,
};

export const statisticsQueryOptions = {
  completion: (childProfileId: number) =>
    queryOptions({
      queryKey: statisticsKeys.getCompletionStatistics(childProfileId),
      queryFn: () => getCompletionStatistics(childProfileId),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    }),

  categories: (childProfileId: number) =>
    queryOptions({
      queryKey: statisticsKeys.getCategoryStatistics(childProfileId),
      queryFn: () => getCategoryStatistics(childProfileId),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    }),
};
