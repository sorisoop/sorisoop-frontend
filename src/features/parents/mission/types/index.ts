export enum MissionStep {
  SELECT_CHILD = "SELECT_CHILD",
  INPUT_TITLE = "INPUT_TITLE",
  SELECT_MISSION_TYPE = "SELECT_MISSION_TYPE",
  READ_BY_CATEGORY = "READ_BY_CATEGORY",
  INPUT_BOOK_COUNT = "INPUT_BOOK_COUNT",
  READ_SPECIFIC_FAIRY_TALE = "READ_SPECIFIC_FAIRY_TALE",
  CREATE_FAIRY_TALE = "CREATE_FAIRY_TALE",
  INPUT_PERIOD = "INPUT_PERIOD",
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
}

export const MissionStepLabel: Record<MissionStep, string> = {
  [MissionStep.SELECT_CHILD]: "아이 선택",
  [MissionStep.INPUT_TITLE]: "미션 제목 입력",
  [MissionStep.SELECT_MISSION_TYPE]: "미션 타입 선택",
  [MissionStep.READ_BY_CATEGORY]: "카테고리별 읽기",
  [MissionStep.INPUT_BOOK_COUNT]: "몇 권 읽기",
  [MissionStep.READ_SPECIFIC_FAIRY_TALE]: "특정 동화책 읽기",
  [MissionStep.CREATE_FAIRY_TALE]: "동화 창작",
  [MissionStep.INPUT_PERIOD]: "미션 기간 선택",
  [MissionStep.COMPLETED]: "미션 생성 완료",
  [MissionStep.ERROR]: "미션 생성 실패",
};
