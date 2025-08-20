import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Lottie from "react-lottie-player";

import creditCardAnimation from "@/lotties/credit-card.json";

import { useStartSubscription } from "@/entities/subscription/api/mutations";

export default function PaymentSuccessPage() {
  const [params] = useSearchParams();
  const { mutateAsync: startSubscription } = useStartSubscription();

  useEffect(() => {
    const orderId = params.get("orderId");
    const paymentKey = params.get("paymentKey");
    const amount = Number(params.get("amount"));
    const planType = params.get("planType") as "MONTH" | "YEAR";

    if (orderId && paymentKey && amount && planType) {
      startSubscription({ orderId, paymentKey, amount, planType })
        .then((res) => {
          console.log("구독 확정 성공:", res);
          // 여기서 route 이동 or toast 띄우기
        })
        .catch((err) => {
          console.error("구독 확정 실패:", err);
        });
    }
  }, [params, startSubscription]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie animationData={creditCardAnimation} loop play className="w-64 h-64" />
      <h1 className="mt-4 text-xl font-bold">결제 진행중...</h1>
      <div className="progress-container w-64 mt-6">
        <div className="progress-bar"></div>
      </div>
    </div>
  );
}
