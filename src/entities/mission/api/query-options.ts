import { queryOptions } from "@tanstack/react-query";
import { getGivenMissions } from "./get";

export const missionKeys = {
  given: (childProfileId: number) => ["mission", "given", childProfileId] as const,
};

export const getGivenMissionsQueryOptions = (childProfileId: number) =>
  queryOptions({
    queryKey: missionKeys.given(childProfileId),
    queryFn: () => getGivenMissions(childProfileId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
