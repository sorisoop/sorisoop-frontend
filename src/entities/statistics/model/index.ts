export interface CompletionStatisticsResponse {
  duration: number;
  totalCount: number;
  readCount: number;
}

export interface CategoryStatisticsDto {
  categoryId: number;
  categoryName: string;
  readCount: number;
}

export interface CategoryStatisticsResponse {
  duration: number;
  categoryStatisticsDtoList: CategoryStatisticsDto[];
}
