import type { FairyTaleResponse } from "../model";
import {
  getFairyTaleCategories,
  getFairyTaleContents,
  getFairyTaleDetailById,
  getFairyTalesByCategory,
  searchFairyTales,
} from "./get";

const PAGE_SIZE = 20;

export const fairyTaleKeys = {
  getFairyTaleContents: (id: string) => ["fairy-tale", "contents", id] as const,
  getFairyTaleCategories: ["fairy-tale", "categories"] as const,
  getFairyTalesByCategory: (categoryId: number) => ["fairy-tale", "category", categoryId] as const,
  getFairyTaleDetailById: (id: string) => ["fairy-tale", "detail", id] as const,
  search: (keyword: string) => ["fairy-tale", "search", keyword] as const,
};

export const fairyTaleQueryOptions = {
  getFairyTaleContents: (id: string) => ({
    queryKey: fairyTaleKeys.getFairyTaleContents(id),
    queryFn: () => getFairyTaleContents(id),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  }),

  getFairyTaleCategories: () => ({
    queryKey: fairyTaleKeys.getFairyTaleCategories,
    queryFn: () => getFairyTaleCategories(),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  }),

  getFairyTalesByCategory: (categoryId: number) => ({
    queryKey: fairyTaleKeys.getFairyTalesByCategory(categoryId),
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => getFairyTalesByCategory(categoryId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: FairyTaleResponse[], allPages: FairyTaleResponse[][]) => {
      return lastPage.length < PAGE_SIZE ? undefined : allPages.length + 1;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  }),

  getFairyTaleDetailById: (id: string) => ({
    queryKey: fairyTaleKeys.getFairyTaleDetailById(id),
    queryFn: () => getFairyTaleDetailById(id),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
  }),

  search: (keyword: string) => ({
    queryKey: fairyTaleKeys.search(keyword),
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => searchFairyTales(keyword, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: FairyTaleResponse[], allPages: FairyTaleResponse[][]) => {
      return lastPage.length < PAGE_SIZE ? undefined : allPages.length + 1;
    },
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 5,
  }),
};
