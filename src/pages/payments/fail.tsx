import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentFailPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const message = searchParams.get("message");

  console.error("결제 실패 코드:", code);
  console.error("결제 실패 메시지:", decodeURIComponent(message || ""));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">결제 실패</h1>
      <p className="mb-6">결제가 정상적으로 진행되지 않았습니다.</p>
      <button onClick={() => navigate("/")} className="px-4 py-2 bg-primary text-white rounded">
        홈으로 돌아가기
      </button>
    </div>
  );
}
