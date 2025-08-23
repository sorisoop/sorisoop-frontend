import { useState } from "react";
import { KakaoLoginButton } from "@/features/auth/components";
import { NonHeaderLayout } from "@/shared/layouts";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { FloatingShapesBackground } from "@/widgets";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <NonHeaderLayout>
      <div className="relative overflow-hidden">
        <FloatingShapesBackground />
        <div className="relative text-center mb-16 flex justify-center items-center gap-2 z-10">
          <div className="inline-flex items-center gap-2">
            <span className="inline-block h-5 w-1.5 rounded-full bg-primary" aria-hidden />
          </div>
          <h1 className="text-2xl font-bold text-foreground">소리숲</h1>
        </div>

        <div className="relative w-full max-w-lg mx-auto space-y-6 p-4 z-10">
          <Input
            type="email"
            placeholder="아이디"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10"
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10"
            />
            <Button
              variant="link"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </Button>
          </div>

          <Button
            variant="default"
            className="w-full h-12 text-secondary opacity-95 font-semibold text-base cursor-pointer"
          >
            로그인
          </Button>

          <div className="text-center">
            <Button variant="ghost" className="text-foreground text-sm font-medium transition-colors">
              회원가입
            </Button>
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
