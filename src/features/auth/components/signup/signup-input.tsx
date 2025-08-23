import { useFormContext } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/shared/components/ui/form";
import type { SignupSchema } from "./signup";

interface SignupInputProps {
  name: Exclude<keyof SignupSchema, "emailChecked">;
  label: string;
  type?: string;
  placeholder?: string;
}

export function SignupInput({ name, label, type = "text", placeholder }: SignupInputProps) {
  const { control } = useFormContext<SignupSchema>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className="h-10 placeholder:text-muted-foreground placeholder:text-sm"
              autoComplete="current-password"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
