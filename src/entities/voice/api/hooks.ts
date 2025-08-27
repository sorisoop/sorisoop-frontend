import { useSuspenseQuery } from "@tanstack/react-query";
import { voiceQueryOptions } from "./query-options";

export const useGetVoices = () => {
  return useSuspenseQuery(voiceQueryOptions.getVoices());
};
