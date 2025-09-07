import { useSuspenseQuery } from "@tanstack/react-query";
import { getGivenMissionsQueryOptions } from "./query-options";

export function useGivenMissions(childProfileId: number) {
  return useSuspenseQuery(getGivenMissionsQueryOptions(childProfileId));
}
