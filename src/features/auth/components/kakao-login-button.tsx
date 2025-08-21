import { Button } from "@/shared/components/ui/button";

export default function KakaoLoginButton() {
  const kakaoLogin = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    window.location.href = `${baseUrl}/oauth2/authorization/kakao`;
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <div className="flex w-full flex-col items-center justify-center">
            <Button
              className="relative w-full h-12 flex items-center justify-center p-4 border border-transparent text-base font-bold rounded-md text-black bg-[#FEE500] hover:bg-[#FEE500]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FEE500] cursor-pointer"
              size="lg"
              onClick={kakaoLogin}
            >
              <img src="/assets/icons/kakao-icon.svg" alt="카카오 로고" className="!w-6 !h-6" />
              카카오로 로그인하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
