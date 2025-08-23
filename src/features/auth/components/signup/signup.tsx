import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/components/ui/form";
import { SignupInput } from "./signup-input";
import { SignupBirthInputs } from "./signup-birth-inputs";
import { SignupPassword, SignupPasswordConfirm } from "./signup-password";
import { SignupSubmit } from "./signup-submit";
import { SignupEmailInput } from "./signup-email-input";
import { Link } from "react-router-dom";
import { FloatingShapesBackground } from "@/widgets";

const formSchema = z
  .object({
    name: z.string().min(2, { message: "이름을 입력해주세요." }),
    email: z.string().email({ message: "올바른 이메일을 입력해주세요." }),
    password: z.string().min(6, { message: "비밀번호는 최소 6자리 이상이어야 합니다." }),
    passwordConfirm: z.string(),
    birth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "생년월일을 올바르게 입력해주세요.")
      .refine((val) => {
        const [y, m, d] = val.split("-").map(Number);
        if (!y || !m || !d) return false;
        if (y < 1920) return false;
        if (m < 1 || m > 12) return false;
        if (d < 1 || d > 31) return false;
        return true;
      }, "생년월일을 올바르게 입력해주세요."),
    emailChecked: z.boolean().refine((v) => v === true, {
      message: "이메일 중복 확인이 필요합니다.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type SignupSchema = z.infer<typeof formSchema>;

interface SignupProps {
  children: React.ReactNode;
  onSubmit: (values: SignupSchema, reset: () => void) => void;
}

function Root({ children, onSubmit }: SignupProps) {
  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      birth: "",
      emailChecked: false,
    },
  });

  return (
    <Form {...form}>
      <div className="relative overflow-hidden">
        <FloatingShapesBackground />
        <div className="relative text-center mb-16 flex justify-center items-center gap-2 z-10 ">
          <div className="inline-flex items-center gap-2">
            <span className="inline-block h-5 w-1.5 rounded-full bg-primary" aria-hidden />
          </div>
          <h1 className="text-2xl font-bold text-foreground">회원가입</h1>
        </div>
        <form
          onSubmit={form.handleSubmit((values) => onSubmit(values, form.reset))}
          className="space-y-6 px-4 max-w-lg mx-auto"
        >
          {children}
        </form>
      </div>
      <div className="mt-6 text-center pb-4">
        <p className="text-sm text-muted-foreground">
          이미 계정이 있으신가요?
          <Link to="/auth/login" className="font-semibold text-primary hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </Form>
  );
}

export const Signup = Object.assign(Root, {
  Input: SignupInput,
  BirthInputs: SignupBirthInputs,
  Password: SignupPassword,
  PasswordConfirm: SignupPasswordConfirm,
  Submit: SignupSubmit,
  Email: SignupEmailInput,
});
