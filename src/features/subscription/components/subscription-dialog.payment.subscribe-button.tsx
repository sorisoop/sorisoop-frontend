import { Button } from "@/shared/components/ui/button";
import { useBrandpayPayment, useSubscriptionContext } from "../hooks";
import { useSubscription } from "@/entities/subscription/api/hooks";

export default function SubscriptionDialogPaymentSubscribeButton() {
  const { selectedPlan } = useSubscriptionContext();
  const { data: subscription } = useSubscription();
  const { requestPayment } = useBrandpayPayment();

  const handleClick = async () => {
    if (subscription) {
      const orderName = `소리숲 ${selectedPlan === "MONTH" ? "월간" : "연간"} 구독`;
      const amount = selectedPlan === "MONTH" ? 9900 : 35900;

      await requestPayment(selectedPlan, orderName, amount);
    }
  };

  const isActive = subscription?.status === "ACTIVE";

  return (
    <Button size="lg" className="w-full h-12 cursor-pointer" onClick={handleClick} disabled={isActive}>
      {isActive ? "구독중" : "구독하기"}
    </Button>
  );
}
