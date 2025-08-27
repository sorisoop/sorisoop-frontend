import { getVoices } from "./get";

export const voiceKeys = {
  getVoices: ["voices"] as const,
};

export const voiceQueryOptions = {
  getVoices: (displayMode: "toast" | "fallback" = "fallback") => ({
    queryKey: ["voices"] as const,
    queryFn: () => getVoices(displayMode),
    staleTime: 1000 * 60 * 5,
    gcTime: 0,
  }),
};
