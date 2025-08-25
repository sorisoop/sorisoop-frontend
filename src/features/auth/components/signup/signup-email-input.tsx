"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import type { SignupSchema } from "./signup";
import { useCheckEmail } from "@/entities/member/api/hooks";

export function SignupEmailInput() {
  const { control, watch, setValue } = useFormContext<SignupSchema>();
  const email = watch("email");
  const { refetch, isFetching } = useCheckEmail(email);

  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");

  const handleCheck = async () => {
    if (!email) return;
    const result = await refetch();

    if (result.data === true) {
      setValue("emailChecked", true, { shouldValidate: true });
      setStatus("valid");
    } else {
      setValue("emailChecked", false, { shouldValidate: true });
      setStatus("invalid");
    }
  };

  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>이메일</FormLabel>
          <div className="flex gap-2">
            <FormControl>
              <Input
                type="email"
                placeholder="이메일"
                {...field}
                className="w-full h-10 placeholder:text-muted-foreground placeholder:text-sm"
                autoComplete="current-email"
              />
            </FormControl>
            <Button
              type="button"
              onClick={handleCheck}
              disabled={isFetching}
              variant="default"
              className="w-1/4 h-10 cursor-pointer text-secondary font-semibold"
            >
              {isFetching ? "확인 중..." : "중복 확인"}
            </Button>
          </div>
          <FormMessage />
          {status === "valid" && <p className="text-sm text-green-600">사용 가능한 이메일입니다</p>}
          {status === "invalid" && <p className="text-sm text-destructive">이미 사용 중인 이메일입니다</p>}
        </FormItem>
      )}
    />
  );
}
