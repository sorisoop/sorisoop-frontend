import { useNavigate } from "react-router-dom";

export default function SubscriptionSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">구독이 시작되었습니다 🎉</h1>
      <p className="mb-6">이제 모든 프리미엄 콘텐츠를 이용하실 수 있습니다.</p>
      <button onClick={() => navigate("/")} className="px-4 py-2 bg-primary text-white rounded">
        홈으로 돌아가기
      </button>
    </div>
  );
}
