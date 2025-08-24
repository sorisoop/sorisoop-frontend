import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/shared/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import type { LoginSchema } from "./login-form";

export function LoginPassword({
  label = "비밀번호",
  placeholder = "비밀번호를 입력하세요",
}: {
  label?: string;
  placeholder?: string;
}) {
  const { control } = useFormContext<LoginSchema>();
  const [show, setShow] = useState(false);

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                type={show ? "text" : "password"}
                placeholder={placeholder}
                {...field}
                className="h-10 placeholder:text-muted-foreground placeholder:text-sm pr-10"
                autoComplete="current-password"
              />
            </FormControl>
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
