export interface CreateMissionRequest {
  title: string;
  childProfileId: number;
  startDate: string | null;
  endDate: string | null;
  missionType: string;
  targetFairyTaleIds?: number[] | null;
  targetCategoryId?: number | null;
  targetCount?: number | null;
}
