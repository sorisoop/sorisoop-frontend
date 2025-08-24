import { useFormContext } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/shared/components/ui/form";
import type { LoginSchema } from "./login-form";

export function LoginInput({
  label = "아이디",
  placeholder = "아이디를 입력하세요",
}: {
  label?: string;
  placeholder?: string;
}) {
  const { control } = useFormContext<LoginSchema>();

  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder={placeholder}
              {...field}
              className="h-10 placeholder:text-muted-foreground placeholder:text-sm"
              autoComplete="email"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
