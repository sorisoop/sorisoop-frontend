import { BaseApiError } from "./base-api-error";

export const ProfileError = {
  PR000: {
    code: "PR000",
    message: "프로필 등록을 실패했습니다.",
    userMessage: "프로필을 등록하지 못했어요. 다시 시도해주세요.",
  },
  PR001: {
    code: "PR001",
    message: "본인 소유의 프로필이 아닙니다.",
    userMessage: "해당 프로필에 접근할 수 없어요.",
  },
  PR002: {
    code: "PR002",
    message: "프로필 삭제를 실패했습니다.",
    userMessage: "프로필을 삭제하지 못했어요. 잠시 후 다시 시도해주세요.",
  },
  PR003: {
    code: "PR003",
    message: "프로필 수정을 실패했습니다.",
    userMessage: "프로필을 수정하지 못했어요. 잠시 후 다시 시도해주세요.",
  },
  PR004: {
    code: "PR004",
    message: "프로필 상세 조회를 실패했습니다.",
    userMessage: "프로필 정보를 불러오지 못했어요.",
  },
  PR005: {
    code: "PR005",
    message: "비밀번호가 일치하지 않습니다.",
    userMessage: "비밀번호가 올바르지 않습니다. 다시 입력해주세요.",
  },
} as const;

export type ProfileErrorCode = keyof typeof ProfileError;

export class ProfileApiError extends BaseApiError {
  constructor(code: ProfileErrorCode, status: number) {
    const { message, userMessage } = ProfileError[code];
    super(code, status, message, userMessage);
  }
}
