import { useSuspenseInfiniteQuery, useSuspenseQuery, type InfiniteData } from "@tanstack/react-query";
import { fairyTaleKeys, fairyTaleQueryOptions } from "./query-options";
import { type FairyTaleCategoryResponse, type FairyTaleContentResponse, type FairyTaleResponse } from "../models";

export const useFairyTaleContents = (id: string) => {
  return useSuspenseQuery<FairyTaleContentResponse[]>(fairyTaleQueryOptions.getFairyTaleContents(id));
};

export const useFairyTaleCategories = () => {
  return useSuspenseQuery<FairyTaleCategoryResponse[]>(fairyTaleQueryOptions.getFairyTaleCategories());
};

export const useFairyTalesByCategoryInfinite = (categoryId: number) => {
  return useSuspenseInfiniteQuery<
    FairyTaleResponse[],
    Error,
    InfiniteData<FairyTaleResponse[]>,
    ReturnType<typeof fairyTaleKeys.getFairyTalesByCategory>,
    number
  >({
    ...fairyTaleQueryOptions.getFairyTalesByCategory(categoryId),
  });
};
