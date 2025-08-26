import { useInfiniteQuery, useSuspenseInfiniteQuery, useSuspenseQuery, type InfiniteData } from "@tanstack/react-query";
import { fairyTaleKeys, fairyTaleQueryOptions } from "./query-options";
import { type FairyTaleCategoryResponse, type FairyTaleContentResponse, type FairyTaleResponse } from "../model";

export const useFairyTaleByRandom = () => {
  return useSuspenseQuery<FairyTaleResponse[]>(fairyTaleQueryOptions.getFairyTaleByRandom());
};

export const useFairyTaleContents = (id: number) => {
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

export const useFairyTaleDetailById = (id: number) => {
  return useSuspenseQuery<FairyTaleResponse>(fairyTaleQueryOptions.getFairyTaleDetailById(id));
};

export const useFairyTaleSearchInfinite = (keyword: string) => {
  return useInfiniteQuery<
    FairyTaleResponse[],
    Error,
    InfiniteData<FairyTaleResponse[]>,
    ReturnType<typeof fairyTaleKeys.search>,
    number
  >({
    ...fairyTaleQueryOptions.search(keyword),
    enabled: !!keyword,
    initialPageParam: 1,
  });
};

export const useFavoriteFairyTalesInfinite = () => {
  return useSuspenseInfiniteQuery<
    FairyTaleResponse[],
    Error,
    InfiniteData<FairyTaleResponse[]>,
    ReturnType<typeof fairyTaleKeys.getFavoriteFairyTales>,
    number
  >({
    ...fairyTaleQueryOptions.getFavoriteFairyTales(),
    initialPageParam: 1,
  });
};

export const useCustomFairyTales = (id: number) => {
  return useSuspenseQuery<FairyTaleResponse[]>(fairyTaleQueryOptions.getCustomFairyTales(id));
};

export const useCustomFairyTaleDetailById = (id: number) => {
  return useSuspenseQuery<FairyTaleResponse>(fairyTaleQueryOptions.getCustomFariyTaleDetailById(id));
};

export const useCustomFairyTaleContents = (id: number) => {
  return useSuspenseQuery<FairyTaleContentResponse[]>(fairyTaleQueryOptions.getCustomFairytaleContents(id));
};
