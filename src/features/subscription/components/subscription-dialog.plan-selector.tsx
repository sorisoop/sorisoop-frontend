import { Check } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { useSubscriptionPlans } from "@/entities/subscription/api/hooks";
import { useSubscriptionContext } from "../hooks";

export default function SubscriptionDialogPlanSelector() {
  const { selectedPlan, setSelectedPlan } = useSubscriptionContext();
  const { data: plans } = useSubscriptionPlans();

  return (
    <div className="flex flex-col space-y-3 mb-6">
      {plans.map((plan) => (
        <Button
          key={plan.id}
          variant="outline"
          size="lg"
          type="button"
          onClick={() => setSelectedPlan(plan.type)}
          className={cn(
            "grid grid-cols-[1fr_auto] items-center gap-4 w-full !h-auto !p-4",
            "rounded-lg border-2 text-left",
            selectedPlan === plan.type ? "border-primary bg-primary/10" : "border-input hover:border-ring/60"
          )}
        >
          <span className="min-w-0 flex items-center gap-3">
            <span
              className={cn(
                "w-5 h-5 rounded-full border-2 grid place-items-center shrink-0",
                selectedPlan === plan.type ? "border-primary bg-primary text-primary-foreground" : "border-input"
              )}
            >
              {selectedPlan === plan.type && <Check className="w-3 h-3" />}
            </span>
            <span className="text-base font-medium">{plan.type === "YEAR" ? "1년" : "1개월"}</span>
          </span>
          <span className="justify-self-end text-right flex flex-col items-end leading-none">
            <span className="text-xl font-bold whitespace-nowrap">{plan.price.toLocaleString()}원</span>
          </span>
        </Button>
      ))}
    </div>
  );
}
