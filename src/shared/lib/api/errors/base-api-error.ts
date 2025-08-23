export type DisplayMode = "toast" | "fallback";

export abstract class BaseApiError extends Error {
  public displayMode?: DisplayMode;

  constructor(public readonly code: string, public override readonly message: string, public readonly status: number) {
    super(message);
    this.name = new.target.name;
  }
}
