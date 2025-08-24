import { useNavigate, Link } from "react-router-dom";
import { FloatingShapesBackground } from "@/widgets";
import { KakaoLoginButton } from "@/features/auth/components";
import { LoginForm } from "@/features/auth/components/login";
import type { LoginSchema } from "@/features/auth/components/login/login-form";
import { Separator } from "@/shared/components/ui/separator";
import { NonHeaderLayout } from "@/shared/layouts";
import { useLogin } from "@/entities/member/api/mutations";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleLogin = (values: LoginSchema, reset: () => void) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        reset();
        navigate("/profile");
      },
    });
  };

  return (
    <NonHeaderLayout>
      <div className="relative overflow-hidden">
        <FloatingShapesBackground />

        <div className="relative text-center mb-16 flex justify-center items-center gap-2 z-10">
          <span className="inline-block h-5 w-1.5 rounded-full bg-primary" />
          <h1 className="text-2xl font-bold text-foreground">소리숲</h1>
        </div>

        <div className="relative w-full max-w-lg mx-auto space-y-6 p-4 z-10">
          <LoginForm onSubmit={handleLogin}>
            <LoginForm.Input label="아이디" />
            <LoginForm.Password label="비밀번호" />
            <LoginForm.Submit label="로그인" />
          </LoginForm>

          <div className="text-center">
            <Link to="/auth/signup" className="text-sm font-medium text-foreground">
              회원가입
            </Link>
          </div>

          <div className="relative py-4">
            <Separator />
            <div className="absolute inset-0 flex justify-center items-center">
              <span className="bg-background px-4 text-xs text-muted-foreground">또는</span>
            </div>
          </div>

          <KakaoLoginButton />
        </div>
      </div>
    </NonHeaderLayout>
  );
}
