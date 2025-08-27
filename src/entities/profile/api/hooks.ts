import { useSuspenseQuery } from "@tanstack/react-query";
import type { ProfileResponse } from "../model";
import { profileQueryOptions } from "./query-options";

export const useProfiles = () => {
  return useSuspenseQuery<ProfileResponse[]>(profileQueryOptions.getProfiles());
};

export const useProfile = () => {
  return useSuspenseQuery<ProfileResponse>(profileQueryOptions.getProfile());
};
