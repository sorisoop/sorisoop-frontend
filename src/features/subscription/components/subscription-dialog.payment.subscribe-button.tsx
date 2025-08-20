import { Button } from "@/shared/components/ui/button";
import { useBrandpayPayment, useSubscriptionContext } from "../hooks";

export default function SubscriptionDialogPaymentSubscribeButton() {
  const { selectedPlan } = useSubscriptionContext();
  const { requestPayment } = useBrandpayPayment();

  const handleClick = async () => {
    const orderName = `소리숲 ${selectedPlan === "MONTH" ? "월간" : "연간"} 구독`;
    const amount = selectedPlan === "MONTH" ? 9900 : 35900;

    await requestPayment(selectedPlan, orderName, amount);
  };

  return (
    <Button size="lg" className="w-full h-12 cursor-pointer" onClick={handleClick}>
      구독하기
    </Button>
  );
}
