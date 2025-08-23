import { useFormContext } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/shared/components/ui/form";
import type { SignupSchema } from "./signup";

export function SignupPassword() {
  const { control } = useFormContext<SignupSchema>();

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>비밀번호</FormLabel>
          <FormControl>
            <Input type="password" placeholder="비밀번호" {...field} className="h-10" autoComplete="new-password" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SignupPasswordConfirm() {
  const { control } = useFormContext<SignupSchema>();

  return (
    <FormField
      control={control}
      name="passwordConfirm"
      render={({ field }) => (
        <FormItem>
          <FormLabel>비밀번호 확인</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              {...field}
              className="h-10"
              autoComplete="new-password"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
