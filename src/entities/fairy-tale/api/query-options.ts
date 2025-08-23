import { getFairyTaleCategories, getFairyTaleContents } from "./get";

export const fairyTaleKeys = {
  getFairyTaleContents: (id: string) => ["fairy-tale", "contents", id] as const,
  getFairyTaleCategories: ["fairy-tale", "categories"] as const,
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
};
