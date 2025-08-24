import { getProfiles } from "./get";

export const profileKeys = {
  getProfiles: ["profiles"] as const,
};

export const profileQueryOptions = {
  getProfiles: (displayMode: "toast" | "fallback" = "fallback") => ({
    queryKey: profileKeys.getProfiles,
    queryFn: () => getProfiles(displayMode),
    staleTime: 0,
    gcTime: 0,
  }),
};
