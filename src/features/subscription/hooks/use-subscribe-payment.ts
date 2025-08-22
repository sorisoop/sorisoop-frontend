import { useEffect, useState } from "react";

import type { TossPaymentsBrandpay } from "@tosspayments/tosspayments-sdk";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useCustomerKey } from "@/entities/member/api/hooks";

const TOSS_CLIENT_KEY = import.meta.env.VITE_TOSS_PAYMENTS_CLIENT_KEY as string;

export const useSubscribePayment = () => {
  const { data: customerKeyData } = useCustomerKey();
  const [brandpay, setBrandpay] = useState<TossPaymentsBrandpay | null>(null);

  useEffect(() => {
    if (!customerKeyData?.customerKey) return;

    (async () => {
      const toss = await loadTossPayments(TOSS_CLIENT_KEY);
      setBrandpay(
        toss.brandpay({
          customerKey: customerKeyData.customerKey,
          redirectUrl: `${window.location.origin}/payment/callback`, // 성공/실패 리다이렉트
        })
      );
    })();
  }, [customerKeyData]);

  const subscribe = async (plan: "monthly" | "yearly" = "monthly") => {
    if (!brandpay) return;

    const orderId = crypto.randomUUID();
    const orderName = plan === "yearly" ? "소리숲 연간 구독" : "소리숲 월간 구독";
    const amount = plan === "yearly" ? 35900 : 9900;

    await brandpay.requestPayment({
      amount: { currency: "KRW", value: amount },
      orderId,
      orderName,
      successUrl: `${window.location.origin}/payment/success`,
      failUrl: `${window.location.origin}/payment/fail`,
    });
  };

  return { subscribe };
};
