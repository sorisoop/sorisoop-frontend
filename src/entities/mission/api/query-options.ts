import { queryOptions } from "@tanstack/react-query";
import { getAssignedMissions, getGivenMissions, getMissionDetail } from "./get";

export const missionKeys = {
  getGivenMissions: (childProfileId: number) => ["mission", "given", childProfileId] as const,
  getMissionDetail: (missionId: number) => ["mission", "detail", missionId] as const,
  getAssignedMissions: () => ["mission", "assigned"] as const,
};

export const missionQueryOptions = {
  getGivenMissions: (childProfileId: number) =>
    queryOptions({
      queryKey: missionKeys.getGivenMissions(childProfileId),
      queryFn: () => getGivenMissions(childProfileId),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    }),

  getMissionDetail: (missionId: number) =>
    queryOptions({
      queryKey: missionKeys.getMissionDetail(missionId),
      queryFn: () => getMissionDetail(missionId),
      staleTime: 1000 * 60 * 1,
      gcTime: 1000 * 60 * 10,
    }),
  getAssignedMissions: () =>
    queryOptions({
      queryKey: missionKeys.getAssignedMissions(),
      queryFn: () => getAssignedMissions(),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    }),
};
