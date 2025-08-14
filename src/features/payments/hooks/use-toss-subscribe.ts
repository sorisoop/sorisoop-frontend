import { useEffect, useState } from "react";
import type { TossPaymentsPayment } from "@tosspayments/tosspayments-sdk";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { api } from "@/shared/lib/api/ky";

const TOSS_CLIENT_KEY = import.meta.env.VITE_TOSS_PAYMENTS_CLIENT_KEY as string;

/** 실제 운영에선 customerKey를 백엔드에서 가져옴 */
const getOrCreateCustomerKey = () => {
  const existingKey = localStorage.getItem("customerKey");
  if (existingKey) return existingKey;
  const customerKey = btoa(Math.random().toString()).slice(0, 20);
  localStorage.setItem("customerKey", customerKey);
  return customerKey;
};

export const useTossSubscribe = () => {
  const customerKey = getOrCreateCustomerKey();
  const [paymentInstance, setPaymentInstance] = useState<TossPaymentsPayment | null>(null);

  useEffect(() => {
    (async () => {
      const toss = await loadTossPayments(TOSS_CLIENT_KEY);
      setPaymentInstance(toss.payment({ customerKey }));
    })();
  }, [customerKey]);

  const requestBillingAuth = async () => {
    if (!paymentInstance) return;
    await paymentInstance.requestBillingAuth({
      method: "CARD",
      successUrl: `${window.location.origin}/payment/billing`,
      failUrl: `${window.location.origin}/payment/fail`,
      customerEmail: "customer123@gmail.com",
      customerName: "홍길동",
    });
  };

  const requestPayment = async () => {
    await api.post("api/subscription/start", {
      // 여기 슬래시 제거도 중요
      json: {
        memberId: 1, // 로그인 유저 ID
        plan: "monthly", // 선택한 플랜
        customerKey,
        orderId: `order-${Date.now()}`,
        orderName: "프리미엄 구독",
        amount: 9900,
      },
    });
  };

  const subscribe = async () => {
    try {
      const billingCard = await api.get("api/billing/card", { throwHttpErrors: false }).json();

      console.log("조회된 카드:", billingCard);

      if (billingCard) {
        await requestPayment();
      } else {
        // 없으면 카드 등록 진행
        await requestBillingAuth();
      }
    } catch (err) {
      console.error("카드 조회 실패:", err);
      await requestBillingAuth();
    }
  };

  return { subscribe };
};
