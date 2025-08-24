import { useMutation } from "@tanstack/react-query";
import type { DisplayMode } from "@/shared/lib/api/errors";
import type { SignupRequest } from "../model";
import { login, logout, signup } from "./create";
import type { LoginSchema } from "@/features/auth/components/login/login-form";

export const useSignup = (displayMode: DisplayMode = "toast") => {
  return useMutation({
    mutationFn: (payload: SignupRequest) => signup(payload, displayMode),
    meta: { displayMode },
  });
};

export const useLogin = (displayMode: DisplayMode = "toast") => {
  return useMutation({
    mutationFn: (payload: LoginSchema) => login(payload, displayMode),
    meta: { displayMode },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
