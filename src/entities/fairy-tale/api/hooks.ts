import { useSuspenseQuery } from "@tanstack/react-query";
import { fairyTaleQueryOptions } from "./query-options";
import { type FairyTaleContentResponse } from "../models";

export const useFairyTaleContents = (id: string) => {
  return useSuspenseQuery<FairyTaleContentResponse[]>(fairyTaleQueryOptions.getFairyTaleContents(id));
};
