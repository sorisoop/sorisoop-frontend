import { api } from "@/shared/lib/api/ky";

export interface BillingCard {
  customerKey: string;
  cardCompany: string;
  cardNumber: string;
  cardType: string;
  billingKey: string;
}

export const registerBillingCard = async (billingCard: BillingCard) => {
  await api.post("billing/card", {
    json: billingCard,
  });
};
