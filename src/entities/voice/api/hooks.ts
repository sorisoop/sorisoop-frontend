import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { voiceQueryOptions } from "./query-options";

export const useGetVoices = () => {
  return useSuspenseQuery(voiceQueryOptions.getVoices());
};

export const useTts = (
  voiceUuid: string,
  fairyTaleId: number,
  page: number,
  displayMode: "toast" | "fallback" = "toast"
) => {
  const createTtsQuery = useQuery({
    ...voiceQueryOptions.createTts(voiceUuid, fairyTaleId, displayMode),
    enabled: page === 1,
  });

  const getTtsQuery = useQuery({
    ...voiceQueryOptions.getTts(voiceUuid, page, displayMode),
    enabled: page > 1,
  });

  return page === 1 ? createTtsQuery : getTtsQuery;
};
