import { Button } from "@/shared/components/ui/button";
import { useFormContext } from "react-hook-form";
import type { SignupSchema } from "./signup";

interface SignupSubmitProps {
  disabled?: boolean;
}

export function SignupSubmit({ disabled }: SignupSubmitProps) {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext<SignupSchema>();

  const isDisabled = disabled || isSubmitting || !isValid;

  return (
    <Button type="submit" disabled={isDisabled} className="w-full h-12 text-base font-semibold text-secondary">
      {disabled ? "처리 중..." : "회원가입"}
    </Button>
  );
}
