import { useMutation } from "@tanstack/react-query";
import type { DisplayMode } from "@/shared/lib/api/errors";
import type { SignupRequest } from "../model";
import { signup } from "./create";

export const useSignup = (displayMode: DisplayMode = "toast") => {
  return useMutation({
    mutationFn: (payload: SignupRequest) => signup(payload, displayMode),
    meta: { displayMode },
  });
};
