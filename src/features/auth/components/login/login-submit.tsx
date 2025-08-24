import { Button } from "@/shared/components/ui/button";
import { useFormContext } from "react-hook-form";
import type { LoginSchema } from "./login-form";

export function LoginSubmit({ label = "로그인" }: { label?: string }) {
  const { formState } = useFormContext<LoginSchema>();
  return (
    <Button
      type="submit"
      disabled={formState.isSubmitting}
      className="w-full h-12 text-secondary font-semibold text-base"
    >
      {formState.isSubmitting ? "로그인 중..." : label}
    </Button>
  );
}
