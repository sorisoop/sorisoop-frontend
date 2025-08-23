import { useEffect, useState } from "react";
import { loadTossPayments, type TossPaymentsBrandpay } from "@tosspayments/tosspayments-sdk";
import { useCustomerKey } from "@/entities/member/api/hooks";

const generateOrderId = (planType: string) => {
  return `sub-${planType}-${crypto.randomUUID()}`;
};

const TOSS_CLIENT_KEY = import.meta.env.VITE_TOSS_PAYMENTS_CLIENT_KEY as string;

export const useBrandpayPayment = () => {
  const { data: customerKeyData } = useCustomerKey();
  const [brandpay, setBrandpay] = useState<TossPaymentsBrandpay | null>(null);

  useEffect(() => {
    if (!customerKeyData?.customerKey) return;

    (async () => {
      const toss = await loadTossPayments(TOSS_CLIENT_KEY);
      setBrandpay(
        toss.brandpay({
          customerKey: customerKeyData.customerKey,
          redirectUrl: `${import.meta.env.VITE_API_BASE_URL}/subscription/callback-auth`,
        })
      );
    })();
  }, [customerKeyData]);

  const requestPayment = async (planType: string, orderName: string, amount: number) => {
    if (!brandpay) return;

    const orderId = generateOrderId(planType);

    await brandpay.requestPayment({
      amount: { currency: "KRW", value: amount },
      orderId,
      orderName,
      successUrl: `${window.location.origin}/payment/success?orderId=${orderId}&planType=${planType}`,
      failUrl: `${window.location.origin}/payment/fail?orderId=${orderId}&planType=${planType}`,
    });

    return orderId;
  };

  return { requestPayment };
};
