import type { MissionStatus } from "@/entities/mission/models";

export function getMissionStatusLabel(status: MissionStatus): string {
  switch (status) {
    case "NOT_STARTED":
      return "시작 전";
    case "ONGOING":
      return "진행 중";
    case "COMPLETED":
      return "완료";
    case "FAILED":
      return "실패";
    default:
      return status;
  }
}
