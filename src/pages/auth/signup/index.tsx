"use client";

import { Signup } from "@/features/auth/components/signup";
import { NonHeaderLayout } from "@/shared/layouts";

export default function SignupPage() {
  const handleSignup = (values: any) => {
    console.log("회원가입 요청:", values);
    // TODO: API 연동 (POST /signup)
  };

  return (
    <NonHeaderLayout>
      <Signup onSubmit={handleSignup}>
        <Signup.Input name="name" label="이름" placeholder="이름" />
        <Signup.BirthInputs />
        <Signup.Input name="email" label="이메일" type="email" placeholder="이메일" />
        <Signup.Password />
        <Signup.PasswordConfirm />
        <Signup.Submit />
      </Signup>
    </NonHeaderLayout>
  );
}
