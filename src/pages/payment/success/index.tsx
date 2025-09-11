import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Lottie from "react-lottie-player";
import { useStartSubscription } from "@/entities/subscription/api/mutations";
import creditCardAnimation from "@/lotties/credit-card.json";

export default function PaymentSuccessPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { mutateAsync: startSubscription } = useStartSubscription();

  useEffect(() => {
    async function confirmSubscription() {
      const orderId = params.get("orderId");
      const paymentKey = params.get("paymentKey");
      const amount = Number(params.get("amount"));
      const planType = params.get("planType") as "MONTH" | "YEAR";

      if (orderId && paymentKey && amount && planType) {
        await startSubscription({ orderId, paymentKey, amount, planType });
        navigate("/my", { replace: true });
      }
    }

    confirmSubscription();
  }, [params, startSubscription, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie animationData={creditCardAnimation} loop play className="w-64 h-64" />
      <h1 className="mt-4 text-xl font-bold">결제 확인 중...</h1>
      <div className="progress-container w-64 mt-6">
        <div className="progress-bar"></div>
      </div>
    </div>
  );
}
