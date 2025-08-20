import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LocalLoginButton() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col pt-4">
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <div className="flex w-full flex-col items-center justify-center">
          <Button
            variant="outline"
            className="relative w-full h-12 flex items-center justify-center p-4 border text-base font-bold rounded-md text-foreground cursor-pointer"
            size="lg"
            onClick={() => navigate("/auth/login/local")}
          >
            이메일로 로그인하기
          </Button>
        </div>
      </div>
    </div>
  );
}
