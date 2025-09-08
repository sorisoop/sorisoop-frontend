import { useSuspenseQuery } from "@tanstack/react-query";
import { missionQueryOptions } from "./query-options";

export function useGivenMissions(childProfileId: number) {
  return useSuspenseQuery(missionQueryOptions.getGivenMissions(childProfileId));
}

export function useMissionDetail(missionId: number) {
  return useSuspenseQuery(missionQueryOptions.getMissionDetail(missionId));
}
