import { getProfile, getProfiles } from "./get";

export const profileKeys = {
  getProfiles: ["profiles"] as const,
  getProfile: ["profile"] as const,
  getChildren: ["profiles", "children"] as const,
};

export const profileQueryOptions = {
  getProfiles: (displayMode: "toast" | "fallback" = "fallback") => ({
    queryKey: profileKeys.getProfiles,
    queryFn: () => getProfiles(displayMode),
    staleTime: 0,
    gcTime: 0,
  }),

  getProfile: (displayMode: "toast" | "fallback" = "fallback") => ({
    queryKey: profileKeys.getProfile,
    queryFn: () => getProfile(displayMode),
    staleTime: 0,
    gcTime: 0,
  }),
};
