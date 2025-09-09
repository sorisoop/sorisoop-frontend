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

export type MissionType = "CREATE_FAIRY_TALE" | "READ_BOOK" | "READ_CATEGORY";

export type MissionStatus = "NOT_STARTED" | "ONGOING" | "COMPLETED" | "FAILED";

export interface GetGivenMissionResponse {
  missionId: number;
  title: string;
  childName: string;
  missionType: MissionType;
  startDate: string;
  endDate: string;
  missionStatus: MissionStatus;
  progressRate: number;
}

export interface MissionDetailResponse {
  missionType: "CREATE_FAIRY_TALE" | "READ_BOOK" | "READ_CATEGORY";
  targetCount: number;
  completedCount: number;
  category: string | null;
  readBookMissionInfoDtos:
    | {
        fairyTaleId: number;
        title: string;
        thumbnailImage: string;
        read: boolean;
      }[]
    | null;
}

export interface AssignedMissionResponse {
  missionId: number;
  title: string;
  missionType: MissionType;
  startDate: string;
  endDate: string;
  missionStatus: MissionStatus;
  progressRate: number;
}
