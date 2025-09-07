export type DisplayMode = "toast" | "fallback";

export abstract class BaseApiError extends Error {
  public displayMode?: DisplayMode;
  public readonly userMessage: string;

  constructor(public readonly code: string, public readonly status: number, message: string, userMessage?: string) {
    super(message);
    this.name = new.target.name;
    this.userMessage = userMessage ?? "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
}
