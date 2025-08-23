import { useSignup } from "@/entities/member/api/mutations";
import { Signup } from "@/features/auth/components/signup";
import type { SignupSchema } from "@/features/auth/components/signup/signup";
import { NonHeaderLayout } from "@/shared/layouts";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useSignup("toast");

  const handleSignup = async (values: SignupSchema, reset: () => void) => {
    await mutateAsync(
      {
        name: values.name,
        birth: values.birth,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          reset();
          navigate("/auth/login");
        },
      }
    );
  };

  return (
    <NonHeaderLayout>
      <Signup onSubmit={handleSignup}>
        <Signup.Input name="name" label="이름" placeholder="이름" />
        <Signup.BirthInputs />
        <Signup.Email />
        <Signup.Password />
        <Signup.PasswordConfirm />
        <Signup.Submit disabled={isPending} />
      </Signup>
    </NonHeaderLayout>
  );
}
