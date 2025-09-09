import { useSuspenseQuery } from "@tanstack/react-query";
import { missionQueryOptions } from "./query-options";

export const useGivenMissions = (childProfileId: number) => {
  return useSuspenseQuery(missionQueryOptions.getGivenMissions(childProfileId));
};

export const useMissionDetail = (missionId: number) => {
  return useSuspenseQuery(missionQueryOptions.getMissionDetail(missionId));
};

export const useAssignedMissions = () => {
  return useSuspenseQuery(missionQueryOptions.getAssignedMissions());
};
