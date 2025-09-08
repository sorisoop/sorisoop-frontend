import { queryOptions } from "@tanstack/react-query";
import { getGivenMissions, getMissionDetail } from "./get";

export const missionKeys = {
  getGivenMissions: (childProfileId: number) => ["mission", "given", childProfileId] as const,
  getMissionDetail: (missionId: number) => ["mission", "detail", missionId] as const,
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
};
