import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { useMissionFlowContext } from "@/features/parents/mission/hooks";
import { MissionStep } from "@/features/parents/mission/types";

export default function InputBookCount() {
  const { goToStep, step, targetCount, setTargetCount } = useMissionFlowContext();

  const append = (val: string) => {
    setTargetCount((prev) => {
      const next = prev === null ? val : prev.toString() + val;
      const num = Number(next);
      if (num > 100) return prev;
      return num;
    });
  };

  const backspace = () => {
    setTargetCount((prev) => {
      if (prev === null) return null;
      const str = String(prev).slice(0, -1);
      return str.length > 0 ? Number(str) : null;
    });
  };

  const isValid = targetCount !== null && targetCount > 0;

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold mt-6">읽을 권수를 입력해주세요</h2>
      <p className="text-base text-muted-foreground mt-2 mb-6">이번 미션에서 읽을 책의 개수를 정해주세요</p>

      <div className="text-4xl font-bold tracking-widest text-center">{targetCount || "0"}</div>
      {Number(targetCount) > 100 && (
        <p className="text-destructive text-sm text-center mt-2">최대 100권까지만 입력할 수 있어요</p>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.2, delay: 0.4 }}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-screen-xl w-full bg-background"
        >
          <div className="grid grid-cols-3 gap-3 p-4 max-w-screen-xl mx-auto">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "←"].map((val) => (
              <Button
                key={val}
                variant="ghost"
                className="h-12 text-xl font-semibold cursor-pointer"
                onClick={() => (val === "←" ? backspace() : append(val))}
              >
                {val}
              </Button>
            ))}
          </div>

          <div className="p-4 border-t">
            <Button
              disabled={!isValid}
              className="w-full h-10 font-semibold text-secondary cursor-pointer"
              onClick={() => {
                setTargetCount(Number(targetCount));
                goToStep(MissionStep.INPUT_PERIOD);
              }}
            >
              선택
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
