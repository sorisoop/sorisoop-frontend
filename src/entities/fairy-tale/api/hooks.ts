import { useSuspenseQuery } from "@tanstack/react-query";
import { fairyTaleQueryOptions } from "./query-options";
import { type FairyTaleCategoryResponse, type FairyTaleContentResponse } from "../models";

export const useFairyTaleContents = (id: string) => {
  return useSuspenseQuery<FairyTaleContentResponse[]>(fairyTaleQueryOptions.getFairyTaleContents(id));
};

export const useFairyTaleCategories = () => {
  return useSuspenseQuery<FairyTaleCategoryResponse[]>(fairyTaleQueryOptions.getFairyTaleCategories());
};
