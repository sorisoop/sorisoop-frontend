import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "@/shared/lib/api/ky";

export default function BillingSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const registerCard = async () => {
      const authKey = searchParams.get("authKey");
      const customerKey = searchParams.get("customerKey");

      //   if (!authKey || !customerKey) {
      //     navigate("/payment/fail");
      //     return;
      //   }

      await api.post("api/billing/card", {
        json: { authKey, customerKey },
      });

      try {
        await api.post("api/subscription/start", {
          json: {
            customerKey,
            orderId: `order-${Date.now()}`,
            orderName: "프리미엄 구독",
            amount: 9900,
          },
        });
        navigate("/subscription/success");
      } catch (e) {
        console.error(e);
        // navigate("/payment/fail");
      }
    };

    registerCard();
  }, [navigate, searchParams]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-lg">카드 등록 처리중...</p>
    </div>
  );
}
