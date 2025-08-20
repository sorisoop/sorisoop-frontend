import { useEffect, useState } from "react";

import type { TossPaymentsBrandpay } from "@tosspayments/tosspayments-sdk";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

import { useCustomerKey } from "@/entities/billing/api/hooks";

const TOSS_CLIENT_KEY = import.meta.env.VITE_TOSS_PAYMENTS_CLIENT_KEY as string;

export const useManageCard = () => {
  const { data: customerKeyData } = useCustomerKey();
  const [brandpay, setBrandpay] = useState<TossPaymentsBrandpay | null>(null);

  useEffect(() => {
    if (!customerKeyData?.customerKey) return;

    (async () => {
      const toss = await loadTossPayments(TOSS_CLIENT_KEY);
      setBrandpay(
        toss.brandpay({
          customerKey: customerKeyData.customerKey,
          redirectUrl: `${import.meta.env.VITE_API_BASE_URL}/billing/callback-auth`,
        })
      );
    })();
  }, [customerKeyData]);

  const openSettings = async () => {
    if (!brandpay) return;
    await brandpay.openSettings();
  };

  return { openSettings };
};
