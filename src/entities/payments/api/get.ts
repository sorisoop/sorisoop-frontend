import { api } from "@/shared/lib/api/ky";
import type { BillingCard } from "./create";

export const getBillingCard = async () => {
  return await api.get("billing/card").json<BillingCard>();
};
