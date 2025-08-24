import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/components/ui/form";
import { LoginInput } from "./login-input";
import { LoginPassword } from "./login-password";
import { LoginSubmit } from "./login-submit";

const loginSchema = z.object({
  email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
  password: z.string().min(6, "비밀번호는 최소 6자리 이상이어야 합니다."),
});
export type LoginSchema = z.infer<typeof loginSchema>;

function Root({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (values: LoginSchema, reset: () => void) => void;
}) {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => onSubmit(v, form.reset))} className="space-y-6">
        {children}
      </form>
    </Form>
  );
}

export const LoginForm = Object.assign(Root, {
  Input: LoginInput,
  Password: LoginPassword,
  Submit: LoginSubmit,
});
