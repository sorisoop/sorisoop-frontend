import { KakaoLoginButton, LocalLoginButton } from "@/features/auth/components";
import { NonHeaderLayout } from "@/shared/layouts";

export default function LoginPage() {
  return (
    <NonHeaderLayout>
      <h1>gd</h1>
      <KakaoLoginButton />
      <LocalLoginButton />
    </NonHeaderLayout>
  );
}
